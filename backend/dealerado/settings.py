import os
from pathlib import Path
from decouple import config, Csv
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.templatetags.static import static

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='127.0.0.1', cast=Csv())

ENVIRONMENT = config('ENVIRONMENT', default='local')

# Application definition

UNFOLD_UI = [
    "unfold",  # before django.contrib.admin
    "unfold.contrib.filters",  # optional, if special filters are needed
    "unfold.contrib.forms",  # optional, if special form elements are needed
    "unfold.contrib.inlines",  # optional, if special inlines are needed
    "unfold.contrib.import_export",  # optional, if django-import-export package is used
    "unfold.contrib.guardian",  # optional, if django-guardian package is used
    "unfold.contrib.simple_history",  # optional, if django-simple-history package is used
    "unfold.contrib.location_field",  # optional, if django-location-field package is used
    "unfold.contrib.constance",  # optional, if django-constance package is used
]

DEFAULT_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "django.contrib.humanize",
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'storages',
    'django_ckeditor_5',
    'django_json_widget',
    'import_export',
    "rangefilter",
]

PROJECT_APPS = [
    'accounts',
    'wallet',
    'services',
    'utility',
]

INSTALLED_APPS = UNFOLD_UI + DEFAULT_APPS + THIRD_PARTY_APPS + PROJECT_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

ROOT_URLCONF = 'dealerado.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dealerado.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('POSTGRES_DB', default='dealerado-dev'),
        'USER': config('POSTGRES_USER', default='postgres'),
        'PASSWORD': config('POSTGRES_PASSWORD', default='42541011'),
        'HOST': config('POSTGRES_HOST', default='localhost'),
        'PORT': config('POSTGRES_PORT', default='5432'),
    }
}


# S3 Storage Settings
AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = config('AWS_S3_REGION_NAME')

if ENVIRONMENT == "production":
    STORAGES = {
        "default": {
            "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
            "OPTIONS": {
                "access_key": os.environ.get("AWS_ACCESS_KEY_ID"),
                "secret_key": os.environ.get("AWS_SECRET_ACCESS_KEY"),
                "bucket_name": os.environ.get("AWS_STORAGE_BUCKET_NAME"),
                "region_name": os.environ.get("AWS_S3_REGION_NAME"),
                "default_acl": None,
                "querystring_auth": False,
                "file_overwrite": False,
            },
        },
        "staticfiles": {
            "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
        },
    }
    MEDIA_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION_NAME}.amazonaws.com/"
else:
    STORAGES = {
        "default": {
            "BACKEND": "django.core.files.storage.FileSystemStorage",
            "OPTIONS": {
                "location": os.path.join(BASE_DIR, "media"),
            },
        },
        "staticfiles": {
            "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
        },
    }

    MEDIA_URL = "/media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'
USE_I18N = True
TIME_ZONE = 'Asia/Kolkata'
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    BASE_DIR / "static",   # <project>/backend/static/
]

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# CSRF and session settings for production
CSRF_TRUSTED_ORIGINS = [
    "https://api.electrodegames.site",
    "https://electrodegames.site"
]

ENVIRONMENT = config('ENVIRONMENT', default='local')

if ENVIRONMENT == 'production':
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    CSRF_COOKIE_DOMAIN = '.electrodegames.site'
    SESSION_COOKIE_DOMAIN = '.electrodegames.site'
    CSRF_COOKIE_HTTPONLY = True  # usually good for prod
else:
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False
    CSRF_COOKIE_HTTPONLY = False


# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = 'no-reply@electrodegames.site'

# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.zoho.com'  # or Gmail SMTP etc.
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = config("EMAIL_HOST_USER")
# EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
# DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",        # Your Next.js frontend
    "http://127.0.0.1:3000",        # Optional if you access via this
    "https://electrodegames.site"
]

# Optional: if you want to allow credentials like cookies or auth headers
CORS_ALLOW_CREDENTIALS = True



# CKEditor 5 settings

CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': [
            'undo', 'redo', '|',
            'heading', '|',
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'link', '|',
            'bulletedList', 'numberedList', '|',
            'blockQuote', 'codeBlock', '|',
            'insertTable', '|',
            'imageUpload', 'mediaEmbed', '|',
            'removeFormat'
        ],
        'language': 'en',
        'upload_url': '/ckeditor5/upload/',
    }
}


UNFOLD = {
    "SITE_TITLE": "Dealer ADO Admin",
    "SITE_HEADER": "DealerADO Admin",
    "SITE_SUBHEADER": "Site Administration",
    
    "SITE_SYMBOL": "speed",
    "SITE_FAVICONS": [
        {
            "rel": "icon",
            "sizes": "32x32",
            "type": "image/png+xml",
            "href": lambda request: static("favicon.png"),
        },
    ],
    "SHOW_BACK_BUTTON": True,
    
    "STYLES": [
        lambda request: static("css/styles.css"),
    ],
    "SCRIPTS": [
        lambda request: static("js/scripts.js"),
    ],
    
    "SIDEBAR": {
        "show_search": False,
        "command_search": True,
        "show_all_applications": True,
        
        "navigation": [
            {
                "items": [
                    {
                        "title": _("Dashboard"),
                        "icon": "dashboard",
                        "link": reverse_lazy("admin:index"),
                        "permission": lambda request: request.user.is_active and request.user.is_staff,
                    },
                ],
            },
            {
                "title": _("Accounts"),
                "collapsible": True,
                "items": [
                    {"title": _("Users"), "icon": "manage_accounts", "link": reverse_lazy("admin:auth_user_changelist")},
                    {"title": _("User Profiles"), "icon": "person", "link": reverse_lazy("admin:accounts_userprofile_changelist")},
                    {"title": _("Auth Tokens"), "icon": "key", "link": reverse_lazy("admin:authtoken_tokenproxy_changelist")},
                    {"title": _("Groups"), "icon": "group", "link": reverse_lazy("admin:auth_group_changelist")},
                ],
            },
            {
                "title": _("Services"),
                "collapsible": False,
                "items": [
                    {"title": _("Secrets"), "icon": "lock", "link": reverse_lazy("admin:services_secrets_changelist")},
                    {"title": _("Service Categories"), "icon": "category", "link": reverse_lazy("admin:services_servicecategory_changelist")},
                    {"title": _("Services"), "icon": "build", "link": reverse_lazy("admin:services_service_changelist")},
                    {"title": _("Service Form Fields"), "icon": "description", "link": reverse_lazy("admin:services_serviceformfield_changelist")},
                    {"title": _("Render Schemas"), "icon": "schema", "link": reverse_lazy("admin:services_renderschema_changelist")},
                    {"title": _("Service Usage Logs"), "icon": "history", "link": reverse_lazy("admin:services_serviceusagelog_changelist")},
                    {"title": _("Status Codes"), "icon": "check_circle", "link": reverse_lazy("admin:services_httpstatuscode_changelist")},
                ],
            },
            {
                "title": _("Utility"),
                "collapsible": True,
                "items": [
                    {"title": _("Banners"), "icon": "collections", "link": reverse_lazy("admin:utility_banner_changelist")},
                    {"title": _("Banner Images"), "icon": "image", "link": reverse_lazy("admin:utility_bannerimage_changelist")},
                ],
            },
            {
                "title": _("Wallet & Transactions"),
                "collapsible": True,
                "items": [
                    {"title": _("Wallets"), "icon": "account_balance_wallet", "link": reverse_lazy("admin:wallet_wallet_changelist")},
                    {"title": _("Transaction Logs"), "icon": "receipt_long", "link": reverse_lazy("admin:wallet_transactionlog_changelist")},
                ],
            },
        ],
        "DASHBOARD_CALLBACK": "dealerado.admin_dashboard.dashboard_context",
        "COMMAND": {
            "search_models": True, 
            "show_history": True,
        },
    },
    
    
    
}