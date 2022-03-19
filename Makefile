push:
	docker build -t hyphast/task_bot .
	docker push hyphast/task_bot
	docker rmi hyphast/task_bot