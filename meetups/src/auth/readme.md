//https://docs.nestjs.com/recipes/passport

npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local

nest g module auth
nest g service auth

nest g module users
nest g service users

npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
