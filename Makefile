# Issue Tracker - Docker Development Commands

.PHONY: help dev build up down logs shell db-migrate db-reset db-studio install clean mysql

# Default target
help:
	@clear
	@echo "Available commands:"
	@echo "  • make dev                 - Start development server"
	@echo "  • make build               - Build the application"
	@echo "  • make up                  - Start all services"
	@echo "  • make down                - Stop all services"
	@echo "  • make logs                - View container logs"
	@echo "  • make shell               - Access app container shell"
	@echo "  • make db-migrate          - Run Prisma migrations"
	@echo "  • make db-reset            - Reset database"
	@echo "  • make db-studio           - Open Prisma Studio"
	@echo "  • make install             - Install npm dependencies"
	@echo "  • make clean               - Stop containers and remove volumes"
	@echo "  • make mysql               - Access mysql container mysql client"

# Development
dev:
	docker-compose exec app npm run dev

build:
	docker-compose exec app npm run build

# Docker management
up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

shell:
	docker-compose exec app /bin/ash

# Database operations
db-migrate:
	docker-compose exec app npx prisma migrate dev

db-reset:
	docker-compose exec app npx prisma migrate reset

db-studio:
	docker-compose exec app npx prisma studio
mysql:
	docker-compose exec mysql mysql -u root -p

# Dependencies
install:
	docker-compose exec app npm install

# Cleanup
clean:
	docker-compose down -v
	docker-compose rm -f
