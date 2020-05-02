import React from 'react';

import SettingsEmail from './SettingsEmail';
import SettingsPassword from './SettingsPassword';
import SettingsReminder from './SettingsReminder';

export default function Settings() {
  return (
    <div className="row justify-content-center">
      <div className="col-sm-6">
        <SettingsReminder />
        <SettingsEmail />
        <SettingsPassword />
      </div>
    </div>
  );
}
