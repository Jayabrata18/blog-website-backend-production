postgres:
	docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:latest

createdb1:
	docker exec -it postgres createdb --username=postgres --owner=postgres blog

dropdb1: 
	docker exec -it postgres dropdb --username=postgres --owner=postgres blog

migrateup1:
	migrate -path db/migration -database "postgresql://postgres:postgres@localhost:5432/blog?sslmode=disable" -verbose up

migratedown2:
	migrate -path db/migration -database "postgresql://postgres:postgres@localhost:5432/blog?sslmode=disable" -verbose down
	
mongodb:
	docker run --name mongodb -e MONGO_INITDB_DATABASE=blog -p 27017:27017 -d mongo:latest

createdb2:
	docker exec -it mongodb mongo blog --eval 'db.getSiblingDB("blog")'

dropdb2:
	docker exec -it mongodb mongo blog --eval 'db.getSiblingDB("blog").dropDatabase()'

migrateup2:
	migrate-mongo up

migratedown2:
	migrate-mongo down	

.PHONY: postgres createdb dropdb migrateup migratedown mongodb migrateup2 migratedown2 createdb2 dropdb2