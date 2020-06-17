# TS-EXPRESS

> express 配合 typescript 编写的 node 程序

## Started

### 依赖

1. docker
2. nodejs 10+

### 启动数据库

1. 构建 docker 的 mysql 容器服务

```

$ cd scripts/mysql && ./init.mysql.sh && cd ../../

```

2. 安装 sequelize 脚手架依赖

```

$ yarn install // npm install

```

3. 数据库和数据表创建

```
$ cd sequelize && npx sequelize db:create && npx sequelize db:migrate && cd ../
```

跟多关于 sequelize 的使用可以看教程 [点击这里](https://sequelize.org/master/manual/querying.html)

### 启动后台

1. 安装依赖

```
$ yarn install // npm install
```

2. 启动

```
$ yarn dev // npm run dev
```
