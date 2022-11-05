const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})



module.exports = {
devServer:{
  proxy:{
    '/api':{
      target:'http://39.98.123.211:8510',
       },
     },
   },
};
