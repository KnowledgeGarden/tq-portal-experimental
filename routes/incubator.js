/**
 * Incubator separates guild leader activities from the rest of
 * guild.js activities
 * This is not a menu item; it merely supports incubator.hbs stuff
 */
var Constants = require("../apps/constants"),
    Help = require("./helpers/helpers"),
    Im = require("../apps/models/incubator_model"),
    conversationConstants = require("../apps/models/conversation_constants");

const LEADER = "_L",
      OWNER_LEADER = "_OL";

exports.plugin = function(app, environment) {
    var CommonModel = environment.getCommonModel(),
        helpers = new Help(environment),
//        GuildModel = environment.getGuildModel(),
        AdminModel = environment.getAdminModel(),
        IncubatorModel = new Im(environment);

    console.log("Incubator "+IncubatorModel);

    /////////////////
    // Routes
    /////////////////
        

    /**
    * Leave the incubator room
    */
    app.get('/incubator/leave', function(req, res) {
        //TODO anything we might want to do here
        res.redirect('/issue');
    });
    ///////////////////////////
    // NOTE:
    //  Remembering means that an authenticated user, visiting some node,
    //  clicks on the Remember button. This action saves the node to a
    //  local clipboard
    //  We use req.session.transclude for the Remember button
    //  @see /routes/conversation.js /remember/:id
    //////////////////////////
    /**
     * Requires that a Remembered Quest NodeId is available
     */
    app.get("/incubator/selectrootnode/:id", function(req, res) {
        var q = req.params.id,
            selectedId = req.session.transclude;
//        console.log("SELROOT ", q, selectedId);
        //TODO
        req.flash("error", "SelectRoot "+q+" "+selectedId);
        return res.redirect("/");

      });
  
    app.get("/incubator/playmoves/:id", function(req, res) {
        var q = req.params.id;
        //TODO
        req.flash("error", "Play "+q);
        return res.redirect("/");
    });

    app.get("/incubator/startmeta/:id", function(req, res) {
        var q = req.params.id;
        //TODO
        req.flash("error", "StartMetaConversation "+q);
        return res.redirect("/");
    });


    /**
     * Requires that a Remembered QuestId is available
     */
    app.get("/incubator/joinquest/:id", function(req, res) {
        var q = req.params.id,
            selectedId = req.session.transclude;
//        console.log("JoinQuest ", q, selectedId);
        //TODO
        req.flash("error", "JoinQuest "+q+" "+selectedId);
        return res.redirect("/");
    });

    /**
     * Requires that a Remembered UserId is available
     */
    app.get("/incubator/addleader/:id", function(req, res) {
        var q = req.params.id,
            selectedId = req.session.transclude;
//        console.log("PLAY ", q, selectedId);
        //TODO
        req.flash("error", "AddLeader "+q+" "+selectedId);
        return res.redirect("/");
    });

    /**
     * Requires that a Remembered UserId is available
     */
    app.get("/incubator/removeleader/:id", function(req, res) {
        var q = req.params.id,
            selectedId = req.session.transclude;
//        console.log("RemoveLeader ", q, selectedId);
        //TODO
        req.flash("error", "RemoveLeader "+q+" "+selectedId);
        return res.redirect("/");
    });

    /**
     * Requires that a Remembered UserId is available
     */
    app.get("/incubator/addmember/:id", function(req, res) {
        var q = req.params.id,
            selectedId = req.session.transclude;
//        console.log("PLAY "+q);
        //TODO
        req.flash("error", "RemoveLeader "+q+" "+selectedId);
        return res.redirect("/");
    });

    /**
     * Requires that a Remembered UserId is available
     */
    app.get("/incubator/removemember/:id", function(req, res) {
        var q = req.params.id,
            selectedId = req.session.transclude;
//        console.log("PLAY "+q);
        //TODO
        req.flash("error", "RemoveLeader "+q+" "+selectedId);
        return res.redirect("/");
    });

    ///////////////////////////////////////////////////////
    // Conversation facade
    //   Provide an input into the various IBIS conversationapp features
    //   but with ability to return to the incubator
    ///////////////////////////////////////////////////////
    /**
    * Configure a conversation node form
    */
    var __getNewSomething = function(type, req, res) {
        var q = req.params.id,        
            contextLocator = req.query.contextLocator,
            data = environment.getCoreUIData(req),
            label = "New Map Node"; //default
        if (type === conversationConstants.QUESTIONTYPE) {label = "New Question/Issue Node";}
        else if (type === conversationConstants.ANSWERTYPE) {label = "New Answer/Position Node";}
        else if (type === conversationConstants.PROTYPE) {label = "New Pro Argument Node";}
        else if (type === conversationConstants.CONTYPE) {label = "New Con Argument Node";}
        //otherwise, default
        data.formtitle = label;
        data.locator = q;
        //trying to prove that guild identity made it here from the button query strings

        data.nodetype = type;
        data.context = contextLocator;
        data.isNotEdit = true;
        data.body = "";
        //TODO change this
        return res.render('incubatorconversationform', data);
    };

    app.get('/incubator/newMap/:id', helpers.isPrivate, function(req, res) {
        return __getNewSomething(conversationConstants.MAPTYPE, req, res);
    });

    app.get('/incubator/newIssue/:id', helpers.isPrivate, function(req, res) {
        return __getNewSomething(conversationConstants.QUESTIONTYPE, req, res);
    });

    app.get('/incubator/newPosition/:id', helpers.isPrivate, function(req, res) {
        return __getNewSomething(conversationConstants.ANSWERTYPE, req, res);
    });

    app.get('/incubator/newPro/:id', helpers.isPrivate, function(req, res) {
        return __getNewSomething(conversationConstants.PROTYPE, req, res);
    });

    app.get('/incubator/newCon/:id', helpers.isPrivate, function(req, res) {
        return __getNewSomething(conversationConstants.CONTYPE, req, res);
    });

    ///////////////////////////////////////////////////////
    // Both "JoinQuest" and "SelectRootNode" require a node "remembered on the clipboard
    // This creates an outrageous ambiguity:
    //   the clipboard might have selected a quest or a root node.
    //   HOW TO DECIDE WHICH?
    // So there is a necessary logic
    // 1- if there is no currentQuest, only show Join Quest
    // 2- Otherwise, show both
    // NOTE: show both on a lone clipboard means that only one is correct
    // For this prototype, we are relying on Guild Leaders to do the right thing
    //
    ///////////////////////////////////////////////////////
    /**
     * Join a chosen quest fired by a button in Incubator
     */
    app.post('/incubator/joinquest', helpers.isPrivate, function(req, res) {
        var questLocator = req.body.locator,
            guildLocator = req.body.guildlocator,
            userId = req.session[Constants.USER_ID],
            userIP = "",
            theUser = helpers.getUser(req),
            sToken = req.session[Constants.SESSION_TOKEN],
            error = "";
        CommonModel.fetchTopic(guildLocator, userId, userIP, sToken, function uFT(err, guildnode) {            if (err) {error += err;}
            var isldr = IncubatorModel.isLeader(guildnode, userLocator);
            //sanith check
            if (isldr) {
                IncubatorModel.joinQuest(guildnode, questLocator, usx, function(err) {
                    if (err) {error += err;}
                    return res.redirect("/incubator/"+guildLocator);
                });
            } else {
                //TODO should redirect to 500 with error message
                return res.redirect("/");
            }
            
        });
    });
   
       
    app.post('/incubator/selectrootnode', helpers.isPrivate, function(req, res) {
            var guildLocator = req.body.guildlocator,
            rootLocator = req.body.nodelocator,
            userId = req.session[Constants.USER_ID],
            userIP = "",
            theUser = helpers.getUser(req),
            sToken = req.session[Constants.SESSION_TOKEN],
            error = "";
        CommonModel.fetchTopic(guildLocator, userId, userIP, sToken, function uFT(err, guildnode) {
            if (err) {error += err;}
            var isldr = IncubatorModel.isLeader(guildnode, userLocator);
            //sanith check
            if (isldr) {
                IncubatorModel.setQuestRootNodeLocator(guildnode, rootLocator, usx, function(err) {
                    if (err) {error += err;}
                    return res.redirect("/incubator/"+guildLocator);
                });
            } else {
                //TODO should redirect to 500 with error message
                return res.redirect("/");
            }
            
        });
          
    });
    
};