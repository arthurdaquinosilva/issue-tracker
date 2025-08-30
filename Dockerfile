FROM node:18.18.0-alpine3.17

ENV EDITOR=vi
ENV VISUAL=vi
ENV ENV=/etc/ash/ashrc

WORKDIR /app

RUN mkdir -p /etc/ash && \
  echo "set -o vi" > /etc/ash/ashrc && \
  cd && echo "set -o vi" >> .ashrc && \
  echo "export EDITOR=vi" >> .ashrc && \
  echo "export VISUAL=vi" >> .ashrc && \
  echo "set -o vi" >> .profile

EXPOSE 3000
EXPOSE 3030
EXPOSE 5555

CMD ["tail", "-f", "/dev/null"]
