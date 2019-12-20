class User < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :nick_name,           presence: :true
  validates :email,               presence: :true, uniqueness: true
  validates :encrypted_password,  presence: :true
  validates :last_name,           presence: :true
  validates :first_name,          presence: :true
  validates :last_name_kana,      presence: :true
  validates :first_name_kana,     presence: :true
  validates :birth_year,          presence: :true
  validates :birth_month,         presence: :true
  validates :birth_day,           presence: :true
  validates :phone_number,        presence: :true, uniqueness: true
  
  has_many :products
  has_many :goods
  has_many :comments
  has_many :dealing
  has_many :addresses
  has_many :cards
end