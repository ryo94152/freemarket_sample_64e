class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories, id: :integer do |t|
      t.string :genre
      t.string :ancestry
      t.timestamps
    end
  end
end
