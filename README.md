# HR Management System

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-336791?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square&logo=docker)
![License](https://img.shields.io/badge/License-Apache_2.0-lightgrey?style=flat-square)

HR Management System, insan kaynakları süreçlerini yönetmek için hazırlanmış full-stack bir projedir. Proje; **backend** (API & iş mantığı) ve **frontend** (React tabanlı kullanıcı arayüzü) olmak üzere iki ana bölümden oluşur. Amaç; çalışan yönetimi, bilgi görüntüleme, CRUD işlemleri ve modern bir arayüz üzerinden erişilebilir bir HR sistemi sunmaktır.

---

## 🚀 Proje Genel Yapısı

Aşağıdaki klasör yapısı projeyi iki ana bileşene ayırır:

```
HR/
  ├── backend/        # Backend servisi (API, iş kuralları, veri modeli)
  ├── frontend/       # React tabanlı kullanıcı arayüzü
  ├── HR.pptx         # Proje sunum dosyası
  └── README.md       # Bu dosya
```

Bu yapı sayesinde hem arayüz hem de API birbirinden bağımsız şekilde geliştirilebilir.

---

## 🧩 Özellikler

* Çalışan listesi görüntüleme
* Yeni çalışan ekleme
* Bilgi güncelleme / düzenleme
* Çalışan silme işlemleri
* Modern, sade ve kullanıcı dostu arayüz
* Ayrık backend + frontend mimarisi sayesinde esnek geliştirme

---

## 🛠️ Kullanılan Teknolojiler

### **Frontend**

* React (Create React App)
* JavaScript / JSX
* Component tabanlı UI mimarisi

### **Backend**

* Java Spring Boot

### **Diğer**

* Git versiyon kontrolü
* Proje sunum dosyası (HR.pptx)

---

## 📦 Kurulum

Aşağıdaki adımları izleyerek projeyi yerelde çalıştırabilirsiniz.

### **1) Frontend Çalıştırma**

```bash
cd frontend
npm install
npm start
```

Tarayıcıdan şu adrese gidin:

```
http://localhost:3000
```

### **2) Backend Çalıştırma**

1. `backend` klasörüne geçin.
2. Bağımlılıkları yükleyin (kullanılan teknolojiye göre değişir).
3. Sunucuyu başlatın.
4. Backend API varsayılan olarak bir localhost portunda çalışır.

---

## 🌐 İletişim / API Yapısı

Frontend, backend API'sine HTTP istekleri (GET, POST, PUT, DELETE) üzerinden bağlanır.

Projeye API uç noktalarını dahil etmek istersen örnek endpoint şablonları buraya eklenebilir.

---

## 📚 Geliştirici Notları

* Frontend ve backend tamamen bağımsızdır; ayrı ayrı geliştirilebilir.
* Backend üzerinde yapılacak değişiklikler API sözleşmesine uygun olmalıdır.
* Tasarım, React component mimarisi ile kolay genişletilebilir.
* HR.pptx dosyası proje tanıtımı veya teslimat için kullanılabilir.

---

## 🤝 Katkıda Bulunma

Katkı sağlamak için:

* Issue oluşturabilir,
* Pull request gönderebilir,
* Yeni özellik önerilerinde bulunabilirsin.


---
