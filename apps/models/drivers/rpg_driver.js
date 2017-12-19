/**
 * Created by park on 11/25/2016.
 */
var Qu = require('./query_util'),
    Constants = require('../../constants'),
    RPGDriver;

RPGDriver =  module.exports = function(environment) {
    var self = this,
        httpClient = environment.getHttpClient(),
        queryUtil = new Qu();
    console.log("TopicDriver "+httpClient);


    self.addLeaderToGuild = function(guildLocator, leaderId, userId,
                                userIP, sToken, callback) {
        var urx = '/rpg/',
            verb = Constants.ADD_LEADER,
            query = queryUtil.getCoreQuery(verb, userId, userIP, sToken);
        query.gLoc = guildLocator;
        query.mId = leaderId;
        httpClient.post(urx, query, function tdSNIT(err, rslt) {
            return callback(err, rslt);
        });
    };

    /**
     * Backside will return an error message if this tries to remove
     * the guild's owner from the membership list
     * @param {*} guildLocator 
     * @param {*} leaderId 
     * @param {*} userId 
     * @param {*} userIP 
     * @param {*} sToken 
     * @param {*} callback 
     */
    self.removeLeaderFromGuild = function(guildLocator, leaderId, userId,
                                userIP, sToken, callback) {
        var urx = '/rpg/',
            verb = Constants.REMOVE_LEADER,
            query = queryUtil.getCoreQuery(verb, userId, userIP, sToken);
        query.gLoc = guildLocator;
        query.mId = leaderId;
        httpClient.post(urx, query, function tdSNIT(err, rslt) {
            return callback(err, rslt);
        });
    };

    self.addMemberToGuild = function(guildLocator, memberId, userId,
                                userIP, sToken, callback) {
        var urx = '/rpg/',
            verb = Constants.ADD_MEMBER,
            query = queryUtil.getCoreQuery(verb, userId, userIP, sToken);
        query.gLoc = guildLocator;
        query.mId = memberId;
        httpClient.post(urx, query, function tdSNIT(err, rslt) {
            return callback(err, rslt);
        });
    };

    /**
     * Backside will return an error message if this tries to remove
     * the guild's owner from the membership list
     * @param {*} guildLocator 
     * @param {*} memberId 
     * @param {*} userId 
     * @param {*} userIP 
     * @param {*} sToken 
     * @param {*} callback 
     */
    self.removeMemberFromGuild = function(guildLocator, memberId, userId,
                                userIP, sToken, callback) {
        var urx = '/rpg/',
            verb = Constants.REMOVE_MEMBER,
            query = queryUtil.getCoreQuery(verb, userId, userIP, sToken);
        query.gLoc = guildLocator;
        query.mId = memberId;
        httpClient.post(urx, query, function tdSNIT(err, rslt) {
            return callback(err, rslt);
        });
    };

    /**
     * Setting <code>questLocator</code> to <code>null</code>
     * is the same as leaving a quest
     * @param {*} guildLocator 
     * @param {*} questLocator can be <code>null</code>
     * @param {*} userId 
     * @param {*} userIP 
     * @param {*} sToken 
     * @param {*} callback 
     */
    self.setCurrentQuest = function(guildLocator, questLocator, userId,
        userIP, sToken, callback) {
            var urx = '/rpg/',
            verb = Constants.SET_CURRENT_QUEST,
            query = queryUtil.getCoreQuery(verb, userId, userIP, sToken);
        query.gLoc = guildLocator;
        query.qLoc = questLocator;
        httpClient.post(urx, query, function tdSNIT(err, rslt) {
            return callback(err, rslt);
        });
    };

    /**
     * RootNodeLocator is set initially to a quest's root node.
     * In subsequent game moves, a different root node will be chosen
     * @param {*} guildLocator 
     * @param {*} rootId 
     * @param {*} userId 
     * @param {*} userIP 
     * @param {*} sToken 
     * @param {*} callback 
     */
    self.setCurrentRootId = function(guildLocator, rootId, userId,
        userIP, sToken, callback) {
            var urx = '/rpg/',
            verb = Constants.SET_CURENT_QUEST,
            query = queryUtil.getCoreQuery(verb, userId, userIP, sToken);
        query.gLoc = guildLocator;
        query.rnLoc = rootId;
        httpClient.post(urx, query, function tdSNIT(err, rslt) {
            return callback(err, rslt);
        });
    };

    /**
     * Backside forges a pivot relation between guild and quest
     * and creates a Biography proxy for that relation. This sets
     * CurrentGuildId
     * @param {*} guildLocator 
     * @param {*} questLocator 
     * @param {*} userId 
     * @param {*} userIP 
     * @param {*} sToken 
     * @param {*} callback 
     */
    self.joinQuest = function(guildLocator, questLocator, userId,
        userIP, sToken, callback) {
            var urx = '/rpg/',
            verb = Constants.JOIN_QUEST,
            query = queryUtil.getCoreQuery(verb, userId, userIP, sToken);
        query.gLoc = guildLocator;
        query.qLoc = questLocator;
        httpClient.post(urx, query, function tdSNIT(err, rslt) {
            return callback(err, rslt);
        });
    };


};
