import { values } from 'mobx';
import { types, isStateTreeNode, typecheck } from 'mobx-state-tree';
import { isString, isBoolean, forOwn } from 'lodash';

export const SettingsKeys = ['theme', 'emailNotifications'];
export const SettingsValidation = {
  theme: (val) => {
    return isString(val) && (val === 'Light' || val === 'Dark');
  },
  emailNotifications: (val) => {
    return (
      isBoolean(val) ||
      (isString(val) && (val.toLowerCase() === 'true' || val.toLowerCase() === 'false'))
    );
  },
};

export const isValidSetting = (settingName) => {
  return isString(settingName) && SettingsKeys.indexOf(settingName) > -1;
};

export const UserSettings = types
  .model({
    theme: types.optional(types.enumeration('Themes', ['Light', 'Dark']), 'Light'),
    emailNotifications: false,
  })
  .views((self) => ({}))
  .actions((self) => ({
    /**
     * Set the value of a User Setting.
     * @param {'theme' | 'emailNotifications'} key The key of the value to set.
     * @param {any} value The value to set.
     */
    set(key, value) {
      if (!key || !isString(key) || SettingsKeys.indexOf(key) < 0) {
        console.log(
          `UserSettings@Set: invalid key passed in. key: ${JSON.stringify(key, null, 2)}`,
        );
        return false;
      }

      if (!value || !SettingsValidation[key](value)) {
        console.log(
          `UserSettings@Set: invalid value for key '${key}' passed in. value: ${JSON.stringify(
            value,
            null,
            2,
          )}`,
        );
        return false;
      }

      switch (key) {
        case 'theme':
          self.theme = value;
          return true;
        case 'emailNotifications':
          if (isBoolean(value)) {
            self.emailNotifications = value;
          } else if (isString(value)) {
            if (value.toLowerCase() === 'true') {
              self.emailNotifications = true;
            } else if (value.toLowerCase() === 'false') {
              self.emailNotifications = false;
            } else {
              return false;
            }
          }
          return true;
        default:
          console.log(
            `UserSettings@Set: default switch case reached. this should have been caught by earlier validations. key: ${key} value: ${value}`,
          );
          return false;
      }
    },
  }));

export const User = types
  .model({
    login: types.identifier,
    password: types.string,
    loggedIn: false,
    settings: types.optional(UserSettings, () => UserSettings.create({})),
  })
  .views((self) => ({}))
  .actions((self) => ({
    setLoggedIn(status) {
      if (!status || isBoolean(status)) {
        console.log(
          `User@SetLoggedIn: undefined or invalid status passed in. status: ${JSON.stringify(
            status,
            null,
            2,
          )}`,
        );
        return;
      }

      self.loggedIn = status;
    },
    updateSetting(setting, value) {
      return self.settings.set(setting, value);
    },
    updateSettings(settingsObject) {
      if (!settingsObject) {
        console.log(
          `User@SetLoggedIn: undefined settings object passed in. status: ${JSON.stringify(
            settingsObject,
            null,
            2,
          )}`,
        );
        return [];
      }

      let result = [];
      forOwn(settingsObject, (v, k) => {
        result.push(self.settings.set(k, v));
      });
      return result;
    },
  }));

export const UserStore = types
  .model({
    users: types.map(User),
    debugMode: false,
  })
  .views((self) => ({
    get allUsers() {
      return values(self.users);
    },
    getUserByLogin(login) {
      if (!login || !isString(login)) {
        console.log(
          `UserStore@GetUserByLogin: invalid login passed in. login: ${JSON.stringify(
            login,
            null,
            2,
          )}`,
        );
        return;
      }

      if (!self.users.has(login)) {
        console.log(`UserStore@GetUserByLogin: unable to find user with login '${login}'`);
        return undefined;
      }

      return self.users.get(login);
    },
  }))
  .actions((self) => ({
    setDebugMode(debug) {
      if (!debug || !isBoolean(debug)) {
        return;
      }

      self.debugMode = debug;
    },
    registerUser(user) {
      if (!user) {
        if (self.debugMode) {
          console.error('UserStore@RegisterUser(): Given User is not defined.');
        }

        return undefined;
      }

      if (isStateTreeNode(user)) {
        return self.users.put(user);
      }

      let result = true;
      try {
        typecheck(User, user);
      } catch {
        result = false;
      }

      if (result) {
        const created = User.create(user);
        return self.users.put(created);
      }

      if (self.debugMode) {
        console.error('UserStore@RegisterUser(): Given user is not valid.');
      }
      return false;
    },
    updateUserSetting(user, setting, value) {
      if (!user || !setting || !value) {
        console.log('UserStore@UpdateUserSetting: undefined data passed in.');
        return false;
      }

      const { id } = user;

      if (!id || !isString(id)) {
        const u = self.users.get(user);
        return u && u.updateSetting(setting, value);
      }

      return false;
    },
    updateUserSettings(user, settingsObject) {
      if (!user || !settingsObject) {
        console.log('UserStore@UpdateUserSettings: undefined data passed in.');
        return [];
      }

      const { id } = user;

      if (!id || !isString(id)) {
        const u = self.users.get(user);
        return u && u.updateSettings(settingsObject);
      }

      return [];
    },
  }));
