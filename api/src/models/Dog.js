const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Dog", {
    id: {
      type: DataTypes.UUID,    // identificador unico para que no se pisen los id de la db con los de la api
      defaultValue: DataTypes.UUIDV4,  
      allowNull: false,                 //no se permite que este campo esté vacío, o sea, es un campo requerido
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    life_span: {
      type:DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN4HJhnJo07reTM0Lta1HoTollHloqsqRUVw&usqp=CAU`,
                               ////default value para que me traiga una imagen por defecto si no encuentra una
    },

    createdInDb: {     //para distinguir entre los que me trae la api y los creados en la base de datos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }

  });
}