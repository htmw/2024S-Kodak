# Smart Hire Pro by team Kodak

For deploying in production refer the installation manual [link](https://github.com/htmw/2024S-Kodak/blob/main/documents/Deployment%20Manual%20for%20SmartHirePro.pdf)

To continue with development Install Docker by following instructions on the official [page](https://docs.docker.com/engine/install/)

## Backend
- Navigate to the backend directory at "2024S-Kodak/Sprint 4/flask api/"
- Run the docker-compose.yml using following commands
  
  ``` docker-compose build ```
  ``` docker-compose up -d ```
- Check container status using ``docker ps``
- Check logs using ``docker logs <container_name>


## Frontend
- Navigate to the frontend directory at "2024-Kodak/Sprint 4/SHP"
- Build the frontend container using `` docker build -t <image-name> .``
- Run the docker container using ``docker run -d -p<host_port>:<container_port> <image-name>``
- Check logs using ``docker logs <container_name>``

Refer the [api documentation](https://github.com/htmw/2024S-Kodak/blob/main/documents/Sprint%204/API%20Documentation.pdf) to understand how the backend works

