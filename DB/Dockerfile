FROM mongo

COPY setup.sh /
RUN chmod +x /setup.sh
RUN /setup.sh

ENTRYPOINT ["/usr/bin/mongod"]
CMD ["--auth", "--dbpath=/containerdb"]