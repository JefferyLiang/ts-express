import { Model, Table } from "sequelize-typescript";

@Table({
  tableName: "testers",
  timestamps: false
})
export default class Tester extends Model {}
