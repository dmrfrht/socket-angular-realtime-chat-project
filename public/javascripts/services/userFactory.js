app.factory('userFactory', ['$http', 'env', ($http, env) => {
  const getUser = () => {
    return $http({
      url: env.SERVICE_URL + 'getUser',
      method: 'GET'
    })
      .then(res => {
        return res.data
      })
      .catch(err => {
        if (err) console.error(err)
      })
  }

  return {
    getUser
  }
}])
