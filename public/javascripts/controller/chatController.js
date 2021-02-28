app.controller('chatController', ['$scope', 'chatFactory', 'userFactory', ($scope, chatFactory, userFactory) => {

  /**
   * initialization
   */
  function init() {
    userFactory.getUser()
      .then(user => {
        $scope.user = user
      })
  }

  init()

  $scope.onlineList = []
  $scope.roomList = []
  $scope.activeTab = 1
  $scope.chatClicked = false
  $scope.chatName = ""
  $scope.roomId = ""
  $scope.message = ""
  $scope.messages = []
  $scope.user = {}

  const socket = io.connect('http://localhost:3000')

  socket.on('onlineList', users => {
    $scope.onlineList = users
    $scope.$apply()
  })

  socket.on('roomList', rooms => {
    $scope.roomList = rooms
    $scope.$apply()
  })

  $scope.newRoom = () => {
    // let randomName = Math.random().toString(36).substr(7)

    let roomName = window.prompt("Enter room name")

    if ((roomName !== "") && (roomName !== null)) socket.emit('newRoom', roomName)
  }

  $scope.changeTab = tab => {
    $scope.activeTab = tab
  }

  $scope.switchRoom = room => {
    $scope.roomId = room.id
    $scope.chatName = room.name
    $scope.chatClicked = true

    chatFactory.getMessages(room.id)
      .then(data => {
        $scope.messages[room.id] = data
      })
  }

  $scope.newMessage = () => {

    socket.emit('newMessage', {
      message: $scope.message,
      roomId: $scope.roomId
    })

    $scope.message = ""
  }


}])
