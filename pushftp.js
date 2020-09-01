/**
 * https://heiye9.com/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2%E5%88%B0FTP%E6%9C%8D%E5%8A%A1%E5%99%A8/#%E7%BC%96%E5%86%99%E4%B8%8A%E4%BC%A0%E8%84%9A%E6%9C%AC%E6%96%87%E4%BB%B6
 * */
let FtpDeploy = require('ftp-deploy')
let ftpDeploy = new FtpDeploy()

// ftp 上传
let config = {
    user: "user", // 用户名
    password: "password", // 密码
    host: "1.1.1.1", // 服务器地址
    port: 21, // 端口
    deleteRemote: false, // 上传之前删除远端的所有文件
    localRoot: __dirname + '/build/', // 要部署的本地文件夹路径
    remoteRoot: '/public/pc/', // 远程文件夹路径
    exclude: [], // 排除文件类型
    include: ['*', '**/*'] // 要上传的文件类型,这样写就是上传所有文件
}

ftpDeploy.deploy(config, function(err) {
    if (err){
        console.log("====")
        console.log(err)
    }
    else console.log('finished')
})
