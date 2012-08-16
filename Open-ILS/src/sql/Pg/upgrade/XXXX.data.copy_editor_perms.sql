
INSERT INTO permission.perm_list (id, code, description)
    VALUES (539, 'UPDATE_ui.hide_copy_editor_fields', 'Allows staff to edit displayed copy editor fields');

UPDATE config.org_unit_setting_type SET update_perm = 539 WHERE name = 'ui.hide_copy_editor_fields';

