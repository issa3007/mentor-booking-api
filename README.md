🚀 Mentor Booking API

NestJS + TypeORM + MySQL + Docker

A backend API for a mentorship booking platform where students can schedule sessions with mentors, manage their learning process, and leave reviews.

Built with production-ready architecture:
SOLID, modular design, clean layering (Controllers → Services → Repositories → Entities).

🛠 Tech Stack

NestJS — modular Node.js framework

TypeORM — ORM with Repository & QueryBuilder

MySQL — relational database

JWT — authentication & authorization

class-validator — input validation

Docker / Docker Compose — containerized environment

bcrypt — password hashing

ConfigModule — environment management

⚙️ Features
👤 Users

Registration & login

Secure password hashing

Role-based access (STUDENT, MENTOR, ADMIN)

👨‍🏫 Mentor Profiles

Create mentor profile

Update profile info

Search & filtering by:

name

expertise

hourly rate

active status

📅 Sessions

Students can book mentorship sessions

Mentor availability check (time-overlap detection)

View personal sessions (student & mentor)

Detailed session info with role restrictions

⭐ Reviews

Students leave one review per session

Allowed only after session status = DONE

Mentors can view reviews related to their sessions