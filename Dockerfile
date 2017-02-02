FROM comses/base

RUN apt-get update && apt-get install -q -y \
        curl \
        git \
        libffi-dev \
        libgit2-dev \
        libjpeg-turbo8-dev \
        libpq-dev \
        libxml2-dev \
        libxslt-dev \
        postgresql-client \
        python3-dev \
        python3-pip \
        unrar-free \
        && update-alternatives --install /usr/bin/python python /usr/bin/python3 1000 \
        && locale-gen en_US.UTF-8

ARG REQUIREMENTS_FILE=requirements-dev.txt
ENV PYTHONUNBUFFERED=1 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8
COPY requirements.txt $REQUIREMENTS_FILE /tmp/
RUN pip3 install -r /tmp/$REQUIREMENTS_FILE
# FIXME: run as restricted user, remove unnecessary packages
WORKDIR /code
CMD ["/code/deploy/app/dev.sh"]
