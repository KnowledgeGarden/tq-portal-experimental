/**
 * IncubatorModel separates out some code from GuildModel
 */
var Constants = require("../constants"),
    gameConstants = require("./game_constants"),
    Rdriver = require("./drivers/rpg_driver"),
    IncubatorModel;

IncubatorModel =  module.exports = function(environment) {
    var self = this,
        topicDriver = environment.getTopicDriver(),
        rpgDriver = new Rdriver(environment),
        ConversationModel = environment.getConversationModel(),
        CommonModel = environment.getCommonModel(),
        AdminModel = environment.getAdminModel();

    /**
     * Return <code>true</code> if <code>userLocator</code> is a member of this guild
     * @param guildNode
     * @param userLocator
     * @return boolean
     */
    self.isMember = function(guildNode, userLocator) {
        var memlist = guildNode.getProperty(gameConstants.GUILD_MEMBER_LIST_PROPERTY);
        if (memlist) {
            var where = memlist.indexOf(userLocator);
            return (where > -1);
        }
        return false; // should never happen
    };

    /////////////////////////////////
    // From the Guild proxy's perspective, a game move is
    //  captured in the pair:
    //  {QuestLocator, RootNodeLocator}
    // When you join a quest, the RootNodeLocator is the Quest's
    //  root.
    // In subsequent game moves, the RootNodeLocator will change
    //////////////////////////////////
    /**
     * Joining a quest sets the rootNodeLocator
     * @param {*} guildLocator 
     * @param {*} questLocator 
     * @param {*} userId 
     * @param {*} userIP 
     * @param {*} sToken 
     * @param {*} callback (error)
     */
    self.joinQuest = function(guildLocator, questLocator, userId,
            userIP, sToken, callback) {
        rpgDriver.joinQuest(guildLocator, questLocator, userId, userIP,
                sToken, function(err, rslt) {
            console.log("IncuJoinQuest", err, rslt);
            return callback(err);
        });  
    };

    /**
     * 
     * @param {*} guildLocator 
     * @param {*} questLocator 
     * @param {*} userId 
     * @param {*} userIP 
     * @param {*} sToken 
     * @param {*} callback 
     */
    self.setQuestRootNodeLocator = function(guildLocator, rootNodeLocator, userId,
        userIP, sToken, callback) {

    };
};