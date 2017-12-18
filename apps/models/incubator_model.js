/**
 * IncubatorModel separates out some code from GuildModel
 */
var Constants = require("../constants"),
    gameConstants = require("./game_constants"),
    IncubatorModel;
IncubatorModel =  module.exports = function(environment) {
    var self = this,
        topicDriver = environment.getTopicDriver(),
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
};