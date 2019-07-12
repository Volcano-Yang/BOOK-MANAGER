#GitHub首个仓库

# BOOK-MANAGER
个人开发的小型图书角管理小程序
# 云开发竞赛作品-深大冲冲冲-图书角MANNAGER
作者：深圳大学 杨志发 叶恒

## **1.作品简介**
图书角MANAGE是一个用于公司、机关单位、大学学院、中学班级的小型文化图书角，解决小型图书角管理繁杂和简化借阅流程的小程序。管理者页面有一键扫码图书入库和图书催还等功能，从而减轻管理者工作量；借阅者页面有一键扫码借/还书，临到期提醒等功能，从而简化借阅者的借书流程和防止逾期。用简单的程序，方便人们的生活，是我们制作的初衷。

## **2.实现思路/架构图/流程图**

### **实现思路：**

1. 首先观察我们的校园生活，寻找校园生活中的问题，引发思考，找到痛点
2. 设想小程序的主要功能、用户场景、解决问题的方式和效果
3. 根据设计的主要功能和用户场景制作原型界面
4. 根据原型界面编写wxml和wxss代码，同时实现页面路由
5. 根据在编写前端界面的感受，设计云数据库和云存储，找到合适的方式渲染数据
6. 补齐云函数和JavaScript代码，实现数据沟通
7. 测试优化，整理简化功能，最后上线
（两个成员全程利用腾讯云开发者平台进行团队开发）

### **小程序功能结构**

![image](https://user-images.githubusercontent.com/43328103/59674443-e36b8400-91f5-11e9-8b84-736e7f42ca99.png)

**小程序云开发架构**
![image](https://user-images.githubusercontent.com/43328103/59696904-81277900-921f-11e9-8628-8fa797408213.png)

### **小程序部分模块实现思路：**

![image](https://user-images.githubusercontent.com/43328103/59696958-98fefd00-921f-11e9-92c7-d56703aa2116.png)

用户进入小程序后，入口文件app.js调用云函数login()，云端获取并返回当前用户的openid和该用户的微信公开信息。前端收到返回结果后会将用户的openid和微信昵称存储在globalData里。即登录成功。随后用户可从首页进入借阅者/管理者页面并进行后续操作。提前收取openid是因为多处有使用到，同时也可以实现异步效果。


![image](https://user-images.githubusercontent.com/43328103/59697093-d5caf400-921f-11e9-87c5-ea4348b549ec.png)

管理者进入管理界面时，会调用云函数根据openid查询数据库获取用户信息，显示当前管理的图书角信息和图书角中的借阅记录和已有书籍记录。管理者可用手动输入或者扫码的方式输入图书背后的条形码，然后调用云函数根据输入的isbn码向第三方api平台获取图书详情信息，成功返回结果后，小程序端会显示这些信息，并且向管理者确认信息和要录入的数量。在完成确认后，数据库增加此书数据，即上传图书成功。

![image](https://user-images.githubusercontent.com/43328103/59697097-d6638a80-921f-11e9-977a-3f0b27586ae8.png)

借阅者进入借书界面时，会调用云函数根据openid查询数据库获取用户信息，如果返回的结果显示用户未注册则提示用户注册，若显示已注册则进入下一步。输入图书角序列号后会调用云函数根据输入的id查询数据库获取图书角信息，若成功查询，则进入最后一步。手动输入或扫描图书背后的条形码，可调用云函数根据输入的条形码查询数据库，若此图书角有此书可借阅，则云端返回成功结果，并且将借阅记录存入数据库。即借书成功。

## **3. 项目结果图例**
---
<img src="https://user-images.githubusercontent.com/43328103/59749779-43266580-92b0-11e9-9403-b7d0224fdcbb.png" alt="Sample"  width="380" >

----

<img src="https://user-images.githubusercontent.com/43328103/59750293-2cccd980-92b1-11e9-9011-8bb3a1354010.png" alt="Sample"  width="380" >

----

<img src="https://user-images.githubusercontent.com/43328103/59750327-38b89b80-92b1-11e9-81ed-55621e5b90cf.png" alt="Sample"  width="380" >

----

<img src="https://user-images.githubusercontent.com/43328103/59750361-48d07b00-92b1-11e9-92ba-e4941239902a.png" alt="Sample"  width="380" >

----

<img src="https://user-images.githubusercontent.com/43328103/59750387-5423a680-92b1-11e9-846c-93074844dff2.png" alt="Sample"  width="380" >

----

<img src="https://user-images.githubusercontent.com/43328103/59750435-6bfb2a80-92b1-11e9-9e0c-a68bbd2f8f90.png" alt="Sample"  width="380" >

----

## **4.使用手册：**

### 管理员新建图书角和录入图书：
<img src="https://user-images.githubusercontent.com/43328103/59697311-335f4080-9220-11e9-9faa-5072170d4038.png" alt="Sample"  width="100%" >

<img src="https://user-images.githubusercontent.com/43328103/59697320-36f2c780-9220-11e9-89d7-e156d76b37cc.png" alt="Sample"  width="100%" >

### 借阅者借书：
<img src="https://user-images.githubusercontent.com/43328103/59697343-3e19d580-9220-11e9-9315-e9e09d93f5f3.png" alt="Sample"  width="100%" >

<img src="https://user-images.githubusercontent.com/43328103/59697359-42de8980-9220-11e9-85dc-d2ada1dcf6a2.png" alt="Sample"  width="100%" >

## **5. 演示视频**
https://6465-development-813720-1259208181.tcb.qcloud.la/%E5%9B%BE%E4%B9%A6%E8%A7%92MANAGE%E5%B1%95%E7%A4%BA%E8%A7%86%E9%A2%91.mp4?sign=2d9052cdebdfcc21b9350c204281a9ce&t=1560931771


## **6. 源码链接**
https://github.com/HenryYey/bookManage


## **7.小程序码**
![image](https://user-images.githubusercontent.com/43328103/59697440-6570a280-9220-11e9-83c7-d37048ec5aea.png)


## **8.详细产品设计和开发文档**
https://github.com/HenryYey/bookManage

## **9.不知之处**
由于临近期末时间紧张，考试逼迫，我们只有两个周末的时间设计和开发了这个项目，只做出了部分功能，不足之处希望见谅。

第二版本新增功能：
一键还书功能：上传一张借阅书籍放回到书架哪个位置的图片即可还书。
模板消息提醒功能：对于借阅者，借阅书籍临到期会有消息提醒；对于管理者，可以一键提醒逾期用户归还。

第三版功能：
图书角资源共享：可以搜索附近有权限进入的图书角，可以搜索图书，让每个图书角的资源整合起来，实现图书角资源利用最大化。


**感谢浏览！**
**用程序创造更美好的生活是我们的所愿。**
