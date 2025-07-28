
# ERP Project

This Django-based ERP project is designed with a modular app structure to separate concerns and improve maintainability. Below is a brief overview of each app and how the project is organized.

---

## Project Structure

```
authuser/   # Handles user authentication using JWT, including login, logout, and token refresh
erp/        # Django project configuration directory containing settings.py and project-level configuration
helper/     # Contains utility functions, reusable helper models, and shared components used across other apps
master/     # Contains the core business logic related to the "master" data and operations of the ERP system
manage.py   # Django's command-line utility for administrative tasks
```

---

## App Descriptions

### authuser
- Responsible for user authentication, authorization, and user-related models.
- Acts as the foundation upon which other apps build.
- Manages permissions, user profiles, and any base features required globally.

### erp
- Contains the main project settings including database configurations, middleware, installed apps, and other Django configurations.
- This folder is automatically created by Django and serves as the project root for settings and URLs.

### helper
- Contains utility functions, helper classes, and shared models.
- Provides reusable code components that can be imported and used by any other app.
- Ideal for cross-cutting concerns and generic tools.

### master
- Implements the core business logic for the project.
- Focused on handling master data management such as products, inventory, clients, or any central domain entities.
- Contains the bulk of the project's functional code.

---

## How to Use

1. **Setup Environment**

   - Create and activate a Python virtual environment.
   - Install required dependencies listed in `requirements.txt`.

2. **Configure Environment Variables**

   - Copy `.env.example` to `.env` and update values such as `SECRET_KEY`, database credentials, `ALLOWED_HOSTS`, and CORS settings.

3. **Run Migrations**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create a Superuser**

   ```bash
   python manage.py createsuperuser
   ```

5. **Start the Development Server**

   ```bash
   python manage.py runserver
   ```

6. **Access the API and Admin**

   - API documentation available at `/api/schema/swagger-ui/` (assuming drf-spectacular Swagger UI)
   - Django admin panel available at `/admin/`

---

## Additional Notes

- **JWT Authentication** is implemented via `authuser` app and configured in REST framework settings.
- **CORS** settings are managed via environment variables and `corsheaders` middleware.
- Use the `helper` app to add any shared utilities or common models that you want to reuse.
- Extend `master` app for adding or modifying business logic as the project evolves.

---

If you have any questions or need help with setup, feel free to reach out!
