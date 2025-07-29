import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import { TaskAttributes } from '../types/task';

// Interface for Task creation attributes (optional fields)
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public description!: string;
  public status!: 'pending' | 'in_progress' | 'completed';
  public assignedToId!: number;
  public ownerId!: number;
  public totalTime!: string;
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    assignedToId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    totalTime:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  },

  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
  }
);

Task.belongsTo(User, { as: 'assignedTo', foreignKey: 'assignedToId' });
Task.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

export default Task; 