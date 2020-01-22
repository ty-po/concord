FROM ruby:2.7

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install
EXPOSE 3000

COPY . .

CMD ["rails", "server", "-b", "0.0.0.0"]
