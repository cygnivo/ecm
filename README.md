
# SAP-Compatible Content Server

## 🛠️ Features
- Compatible with SAP `/ContentServer/ContentServer.dll` and `/sapcs/` protocols
- Supports multi-ORG, multi-repository model
- Backend storage: FileSystem, MariaDB, S3 (Azure, GCP, OneDrive/Google Drive supported)
- Full support for: Signature Validation, CMIS, WebDAV, ArchiveLink, Legal Hold, Audit Trail, ILM, e-Invoice, Smart Search, Versioning, Retention

## 🚀 Deployment

### Prerequisites
- Docker + Docker Compose

### Setup
```bash
cp .env.template backend/.env
docker-compose up --build
```

## 🔐 Admin UI
- React Dashboard under `react-admin/`
- Run using `npm install && npm start` inside `react-admin/`

## 📦 APIs
- See Swagger documentation at `/docs` after deployment

## 📚 ABAP + Postman
- Included in `abap/` and `postman/`

## 📁 MariaDB Schema
- Auto-generated per `ORGID` and `CONTREP_ID`
- Includes CONTREP, DOCUMENTS_<ORGID>_<REPOID>, COMPONENTS_<ORGID>_<REPOID>

## 🧠 Advanced Modules
- Legal Hold, ILM, Expiry, Virus Scan Stub, AI Classification (stub), Audit Trail, etc.

## 🧪 Test Scripts
- ABAP samples: upload/read/delete
- Postman collection
