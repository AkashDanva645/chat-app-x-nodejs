import express, { Router } from "express";
import UserRepository from "../../repository/UserRepository";
import CrudController from "../../controllers/dev-controllers/CrudController";
import ContactRepository from "../../repository/ContactRepository";
import MessageRepository from "../../repository/MessageRepository";
import GroupRepository from "../../repository/GroupRepository";
import UserGroupRepository from "../../repository/UserGroupRepository";

const userRepo = new UserRepository();
const userController = new CrudController('User', userRepo);

const router: Router = express.Router();

router.route('/users/')
.get(userController.getAll.bind(userController))
.post(userController.createOne.bind(userController));

router.route('/users/:id')
.get(userController.getOne.bind(userController))
.patch(userController.updateOne.bind(userController))
.delete(userController.deleteOne.bind(userController));


const contactRepo = new ContactRepository();
const contactController = new CrudController('Contact', contactRepo);

router.route('/contacts/')
.get(contactController.getAll.bind(contactController))
.post(contactController.createOne.bind(contactController));

router.route('/contacts/:id')
.get(contactController.getOne.bind(contactController))
.patch(contactController.updateOne.bind(contactController))
.delete(contactController.deleteOne.bind(contactController));


const messageRepo = new MessageRepository();
const messageController = new CrudController('Message', messageRepo);

router.route('/messages/')
.get(messageController.getAll.bind(messageController))
.post(messageController.createOne.bind(messageController));

router.route('/messages/:id')
.get(messageController.getOne.bind(messageController))
.patch(messageController.updateOne.bind(messageController))
.delete(messageController.deleteOne.bind(messageController));


const groupRepo = new GroupRepository();
const groupController = new CrudController('Group', groupRepo);

router.route('/groups/')
.get(groupController.getAll.bind(groupController))
.post(groupController.createOne.bind(groupController));

router.route('/groups/:id')
.get(groupController.getOne.bind(groupController))
.patch(groupController.updateOne.bind(groupController))
.delete(groupController.deleteOne.bind(groupController));


const userGroupRepo = new UserGroupRepository();
const userGroupController = new CrudController('UserGroup', userGroupRepo);

router.route('/user_groups/')
.get(userGroupController.getAll.bind(userGroupController))
.post(userGroupController.createOne.bind(userGroupController));

router.route('/user_groups/:id')
.get(userGroupController.getOne.bind(userGroupController))
.patch(userGroupController.updateOne.bind(userGroupController))
.delete(userGroupController.deleteOne.bind(userGroupController));

export { router };