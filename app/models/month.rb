class Month < ActiveHash::Base
  self.data = [
      {id: 1, name: "01"}, {id: 2, name: "02"}, {id: 3, name: "03"},
      {id: 4, name: "04"}, {id: 5, name: "05"}, {id: 6, name: "06"},
      {id: 7, name: "07"}, {id: 8, name: "08"}, {id: 9, name: "09"},
      {id: 10, name: "10"}, {id: 11, name: "11"}, {id: 12, name: "12"},
  ]
end