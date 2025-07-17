
# SAP-Compatible Content Server

A fully modular, SAP-integrated Content Server written in Node.js with support for:
- SAP Legacy (`ContentServer.dll`) + Modern (`/sapcs/`) interface
- FileSystem, DB, S3, Azure, GCS, OneDrive, Google Drive storage
- Admin UI (React), ABAP test tools, Postman examples
- Docker Compose and ENV management

## Getting Started

1. Clone and install backend
2. Set up `.env` with encryption key and DB credentials
3. Import `create_mariadb_schema.sql`
4. Run `node server.js`

See `react-admin/README.md` for UI usage.

SAP Integration tested via OAC0.
