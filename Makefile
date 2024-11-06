include .env

dev_env_up:
	docker compose -f ./docker-compose.development.yml up -d
dev_env_restart:
	docker compose -f ./docker-compose.development.yml up -d --build
dev_env_down:
	docker compose -f ./docker-compose.development.yml down
dev_env_rm:
	docker compose -f ./docker-compose.development.yml down --rmi local -v
dev_env_start:
	docker compose -f ./docker-compose.development.yml start
dev_env_stop:
	docker compose -f ./docker-compose.development.yml stop

dev_app_connect:
	docker compose -f ./docker-compose.development.yml exec -it node bash
dev_app_start:
	docker compose -f ./docker-compose.development.yml exec -it node yarn dev

prod_env_up:
	docker compose -f ./docker-compose.production.yml up -d
prod_env_restart:
	docker compose -f ./docker-compose.production.yml up -d --build
prod_env_down:
	docker compose -f ./docker-compose.production.yml down
prod_env_rm:
	docker compose -f ./docker-compose.production.yml down --rmi local -v
prod_env_start:
	docker compose -f ./docker-compose.production.yml start
prod_env_stop:
	docker compose -f ./docker-compose.production.yml stop
