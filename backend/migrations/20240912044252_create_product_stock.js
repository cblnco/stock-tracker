const TABLE_NAME = 'product_stock';

exports.up = async knex => {
  const hasRawAppsTable = await knex.schema.hasTable(TABLE_NAME);

  if (!hasRawAppsTable) {
    await knex.schema.createTable(TABLE_NAME, table => {
      table.comment('Table that stores sample products');
      table
        .string('id')
        .primary()
        .notNullable()
        .unique()
        .comment('Id of the product');
      table.string('name');
      table.text('description');
      table.float('price');
      table.integer('stock').comment('Available stock of the product');
      table.text('img').comment('A image url of the product');
      table
        .string('altdesc')
        .comment('An alternative text description of the product image');
    });
  }
};

exports.down = async knex => {
  await knex.schema.dropTable(TABLE_NAME);
};
