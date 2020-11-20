var dog, happyDog, database, foodS, foodStock
var fedTime, lastFed, feed, addFood, food

function preload()
{
  dogImage = loadImage("images/dogimg.png")
  happyDogImage = loadImage("images/happyDog.png")
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database()
  Dog = createSprite(800, 200, 150, 100)
  Dog.addImage(dogImage)
  Dog.scale = 0.15
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
  food = new Food()
  feed = createButton("Feed the Dog")
  feed.position(700, 95)
  feed.mousePressed(feedDog)
  addFood = createButton("Add Food")
  addFood.position(800, 95)
  addFood.mousePressed(addFoods)
}


function draw() {  
background("White")
food.display()
fedTime = database.ref('feedTime')
fedTime.on("value", function(data){
  lastFed = data.val()
})
fill(255, 255, 254)
textSize(15)
if(lastFed >= 12) {
  text("Last Fed" + lastFed%12 + "pm", 350, 30)
}
else if(lastFed == 0) {
  text("Last Fed: 12AM", 350, 30)
}
else {
  text("Last Fed" + lastFed + "am", 350, 30)
}
  drawSprites();  

}

function readStock(data) {
  foodS = data.val()
}

function feedDog() {
  Dog.addImage(happyDogImage)
  food.updateFoodStock(food.getFoodStock()-1)
  database.ref('/').update({
    Food: food.getFoodStock(),
    feedTime: hour()
  })
}

function addFoods() {
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}
