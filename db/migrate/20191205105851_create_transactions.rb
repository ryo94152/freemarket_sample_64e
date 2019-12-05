class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.references :product, foreign_key: true
      t.references :user, foreign_key: true
      t.string :status, null: false
      t.timestamps
    end
  end
end
