class CreateFreeTrials < ActiveRecord::Migration
  def change
    create_table :free_trials do |t|
      t.string :email

      t.timestamps
    end
  end
end
