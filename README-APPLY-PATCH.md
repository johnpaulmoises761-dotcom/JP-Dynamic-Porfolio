# JP Portfolio CMS patch (non-destructive overlay)

This archive contains **only changed/new source files**, not a complete Laravel app.

## Important security note
Your original uploaded ZIP included a hardcoded admin password in `DatabaseSeeder.php`. Rotate that password immediately. The replacement seeder requires `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your local `.env` and no longer seeds sample projects automatically.

## Apply on Windows
1. Stop the Laravel and Vite development servers. Back up your entire `jp-portfolio` folder and **database/database.sqlite** separately. Do not share the SQLite backup publicly.
2. Extract this ZIP into `C:\Users\allen\My-Dynamic-Portfolio\jp-portfolio`, preserving directories and allowing replacement of matching files. **Do not delete the original project folder.**
3. Keep your existing `.env`, `composer.json`, `package.json`, and SQLite database. Do not copy the original uploaded ZIP over the patched files afterward.
4. Run from the project folder:
   ```powershell
   php artisan optimize:clear
   php artisan migrate
   php artisan storage:link
   npm run build
   php artisan route:list
   php artisan test
   ```
   `storage:link` may report the link already exists; that's fine.
5. Start the servers in two terminals: `php artisan serve` and `npm run dev`.
6. Log in at `http://127.0.0.1:8000/login`, then visit `http://127.0.0.1:8000/admin/dashboard`.

## Admin account
- Existing admin users remain in the existing SQLite database.
- If the old password was exposed, use the **Account security** page to rotate it while logged in.
- If you cannot log in, add `ADMIN_EMAIL` and a **unique strong** `ADMIN_PASSWORD` (12+ characters) to your local `.env`, then run `php artisan db:seed --class=DatabaseSeeder`. Do not post those values in chat or commit `.env`.
- After seeding, remove `ADMIN_PASSWORD` from `.env` and clear config. Do not rerun the seeder casually because it resets that admin user's password.

## Features
- `/admin/dashboard`: dashboard navigation
- `/admin/settings`: personal info, hero, about, contact, appearance fields, profile/background image and resume uploads
- `/admin/content/skill`, `/experience`, `/education`, `/certificate`: CRUD and ordering
- `/projects`: existing project CRUD preserved
- `/admin/account`: password change
- `/`: public portfolio reads CMS data from the SQLite database

## Notes / limitations
- The portfolio initially shows the original hardcoded skill list until the first skill record is created. Add skills in admin to replace the default list.
- Existing hardcoded education/certificate copy is intentionally not imported automatically. Enter it in the CMS.
- Existing project schema and CRUD are preserved; advanced project categories, galleries, and reordering are not part of this patch.
- Accent field is stored, but full site-wide accent theme customization and section ordering/visibility are not implemented in this first patch.
- The existing email form still uses `mailto:`; it does not send email through a server.
- Only use this patch after backing up your project and DB. Test on a copy first if possible.
