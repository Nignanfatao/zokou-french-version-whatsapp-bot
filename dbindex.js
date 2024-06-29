'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x2c2369, _0x31178a, _0x5ad980, _0x9bccaf) {
  if (_0x9bccaf === undefined) {
    _0x9bccaf = _0x5ad980;
  }
  var _0x512349 = Object.getOwnPropertyDescriptor(_0x31178a, _0x5ad980);
  if (!_0x512349 || ('get' in _0x512349 ? !_0x31178a.__esModule : _0x512349.writable || _0x512349.configurable)) {
    _0x512349 = {
      'enumerable': true,
      'get': function () {
        return _0x31178a[_0x5ad980];
      }
    };
  }
  Object.defineProperty(_0x2c2369, _0x9bccaf, _0x512349);
} : function (_0x3b6bcd, _0x4440ab, _0x7456e5, _0x2b9ae0) {
  if (_0x2b9ae0 === undefined) {
    _0x2b9ae0 = _0x7456e5;
  }
  _0x3b6bcd[_0x2b9ae0] = _0x4440ab[_0x7456e5];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0xb8157d, _0x3f53c4) {
  Object.defineProperty(_0xb8157d, 'default', {
    'enumerable': true,
    'value': _0x3f53c4
  });
} : function (_0x1e15f0, _0x279550) {
  _0x1e15f0["default"] = _0x279550;
});
var __importStar = this && this.__importStar || function (_0x3bc167) {
  if (_0x3bc167 && _0x3bc167.__esModule) {
    return _0x3bc167;
  }
  var _0x451dcb = {};
  if (_0x3bc167 != null) {
    for (var _0x151e20 in _0x3bc167) if (_0x151e20 !== "default" && Object.prototype.hasOwnProperty.call(_0x3bc167, _0x151e20)) {
      __createBinding(_0x451dcb, _0x3bc167, _0x151e20);
    }
  }
  __setModuleDefault(_0x451dcb, _0x3bc167);
  return _0x451dcb;
};
var __importDefault = this && this.__importDefault || function (_0x2dbc0f) {
  return _0x2dbc0f && _0x2dbc0f.__esModule ? _0x2dbc0f : {
    'default': _0x2dbc0f
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require('@whiskeysockets/baileys'));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1['default'].child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + "/framework/zokou");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require('./bdd/onlyAdmin');
const {
  recupevents
} = require("./bdd/welcome");
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/Zokou-MD-WHATSAPP-BOT;;;=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/auth/creds.json")) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/auth/creds.json") && session != 'zokk') {
      await fs.writeFileSync(__dirname + '/auth/creds.json', atob(session), "utf8");
    }
  } catch (_0x25b374) {
    console.log("Session Invalide " + _0x25b374);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  async function _0x3e4a0f() {
    0x0;
    const {
      version: _0x2ad284,
      isLatest: _0x549aea
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x2ebb58,
      saveCreds: _0x424501
    } = await baileys_1.useMultiFileAuthState(__dirname + '/auth');
    0x0;
    const _0x274415 = {
      'version': _0x2ad284,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ['Zokou-Md', "safari", '1.0.0'],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x2ebb58.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x2ebb58.keys, logger)
      }
    };
    0x0;
    const _0x406241 = baileys_1['default'](_0x274415);
    try {
      store.readFromFile("store.json");
    } catch (_0x10bf56) {}
    setInterval(() => {
      store.writeToFile(__dirname + "/store.json");
    }, 0x3e8);
    store.bind(_0x406241.ev);
    _0x406241.ev.on("messages.upsert", async _0x54e758 => {
      const {
        messages: _0x49c16d
      } = _0x54e758;
      const _0x42d66a = _0x49c16d[0x0];
      if (!_0x42d66a.message) {
        return;
      }
      const _0x46d412 = _0x531d14 => {
        if (!_0x531d14) {
          return _0x531d14;
        }
        if (/:\d+@/gi.test(_0x531d14)) {
          0x0;
          let _0x8c60c = baileys_1.jidDecode(_0x531d14) || {};
          return _0x8c60c.user && _0x8c60c.server && _0x8c60c.user + '@' + _0x8c60c.server || _0x531d14;
        } else {
          return _0x531d14;
        }
      };
      0x0;
      var _0xb4186c = baileys_1.getContentType(_0x42d66a.message);
      var _0x56c149 = _0xb4186c == 'conversation' ? _0x42d66a.message.conversation : _0xb4186c == "imageMessage" ? _0x42d66a.message.imageMessage?.["caption"] : _0xb4186c == "videoMessage" ? _0x42d66a.message.videoMessage?.["caption"] : _0xb4186c == "extendedTextMessage" ? _0x42d66a.message?.["extendedTextMessage"]?.['text'] : _0xb4186c == 'buttonsResponseMessage' ? _0x42d66a?.["message"]?.["buttonsResponseMessage"]?.['selectedButtonId'] : _0xb4186c == "listResponseMessage" ? _0x42d66a.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] : _0xb4186c == "messageContextInfo" ? _0x42d66a?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x42d66a.message?.['listResponseMessage']?.["singleSelectReply"]?.['selectedRowId'] || _0x42d66a.text : '';
      var _0x13db70 = _0x42d66a.key.remoteJid;
      var _0x38a748 = _0x46d412(_0x406241.user.id);
      var _0x32d1a2 = _0x38a748.split('@')[0x0];
      const _0x1dbaa0 = _0x13db70?.['endsWith']('@g.us');
      var _0x3e6347 = _0x1dbaa0 ? await _0x406241.groupMetadata(_0x13db70) : '';
      var _0x203e35 = _0x1dbaa0 ? _0x3e6347.subject : '';
      var _0x124589 = _0x42d66a.message.extendedTextMessage?.['contextInfo']?.['quotedMessage'];
      var _0x3449e1 = _0x46d412(_0x42d66a.message?.["extendedTextMessage"]?.['contextInfo']?.["participant"]);
      var _0x48d567 = _0x1dbaa0 ? _0x42d66a.key.participant ? _0x42d66a.key.participant : _0x42d66a.participant : _0x13db70;
      if (_0x42d66a.key.fromMe) {
        _0x48d567 = _0x38a748;
      }
      var _0x3639d8 = _0x1dbaa0 ? _0x42d66a.key.participant : '';
      const {
        getAllSudoNumbers: _0x8cffdf
      } = require("./bdd/sudo");
      const _0x169b15 = _0x42d66a.pushName;
      const _0x359cac = await _0x8cffdf();
      const _0x17f5a9 = [_0x32d1a2, '22559763447', "22543343357", "22564297888", "‪99393228‬", '22891733300', conf.NUMERO_OWNER].map(_0x33752c => _0x33752c.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x187ac7 = _0x17f5a9.concat(_0x359cac);
      const _0x5e7bc6 = _0x187ac7.includes(_0x48d567);
      var _0x3e55c9 = ['22559763447', "22543343357", "22564297888", "‪99393228‬", '22891733300'].map(_0x37e67c => _0x37e67c.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x48d567);
      function _0x4628bf(_0x260027) {
        _0x406241.sendMessage(_0x13db70, {
          'text': _0x260027
        }, {
          'quoted': _0x42d66a
        });
      }
      console.log("\t [][]...{Zokou-Md}...[][]");
      console.log("=========== Nouveau message ===========");
      if (_0x1dbaa0) {
        console.log("message provenant du groupe : " + _0x203e35);
      }
      console.log("message envoyé par : [" + _0x169b15 + " : " + _0x48d567.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("type de message : " + _0xb4186c);
      console.log("------ contenu du message ------");
      console.log(_0x56c149);
      function _0x3c0d30(_0x2a100b) {
        let _0x1255b8 = [];
        for (_0x54e758 of _0x2a100b) {
          if (_0x54e758.admin == null) {
            continue;
          }
          _0x1255b8.push(_0x54e758.id);
        }
        return _0x1255b8;
      }
      const _0x56b1a1 = _0x1dbaa0 ? await _0x3e6347.participants : '';
      let _0x35146a = _0x1dbaa0 ? _0x3c0d30(_0x56b1a1) : '';
      const _0x4b513a = _0x1dbaa0 ? _0x35146a.includes(_0x48d567) : false;
      var _0x48b824 = _0x1dbaa0 ? _0x35146a.includes(_0x38a748) : false;
      var _0x393b2e = conf.ETAT;
      if (_0x393b2e == 0x1) {
        await _0x406241.sendPresenceUpdate('available', _0x13db70);
      } else {
        if (_0x393b2e == 0x2) {
          await _0x406241.sendPresenceUpdate('composing', _0x13db70);
        } else {
          if (_0x393b2e == 0x3) {
            await _0x406241.sendPresenceUpdate("recording", _0x13db70);
          } else {}
        }
      }
      const _0x4c296f = _0x56c149 ? _0x56c149.trim().split(/ +/).slice(0x1) : null;
      const _0x18b837 = _0x56c149 ? _0x56c149.startsWith(prefixe) : false;
      const _0x447db2 = _0x18b837 ? _0x56c149.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x2c58b3 = conf.URL.split(',');
      function _0x2b363c() {
        const _0x59333c = Math.floor(Math.random() * _0x2c58b3.length);
        const _0x42a292 = _0x2c58b3[_0x59333c];
        return _0x42a292;
      }
      var _0x561764 = {
        'superUser': _0x5e7bc6,
        'dev': _0x3e55c9,
        'verifGroupe': _0x1dbaa0,
        'mbre': _0x56b1a1,
        'membreGroupe': _0x3639d8,
        'verifAdmin': _0x4b513a,
        'infosGroupe': _0x3e6347,
        'nomGroupe': _0x203e35,
        'auteurMessage': _0x48d567,
        'nomAuteurMessage': _0x169b15,
        'idBot': _0x38a748,
        'verifZokouAdmin': _0x48b824,
        'prefixe': prefixe,
        'arg': _0x4c296f,
        'repondre': _0x4628bf,
        'mtype': _0xb4186c,
        'groupeAdmin': _0x3c0d30,
        'msgRepondu': _0x124589,
        'auteurMsgRepondu': _0x3449e1,
        'ms': _0x42d66a,
        'mybotpic': _0x2b363c
      };
      if (_0x42d66a.message.protocolMessage && _0x42d66a.message.protocolMessage.type === 0x0 && conf.ATD.toLocaleLowerCase() === 'oui') {
        if (_0x42d66a.key.fromMe) {
          console.log("Message supprimer me concernant");
          return;
        }
        console.log("Message supprimer");
        let _0x2c2b6b = _0x42d66a.message.protocolMessage.key;
        try {
          const _0x241473 = fs.readFileSync("./store.json", 'utf8');
          const _0x521125 = JSON.parse(_0x241473);
          let _0x8b789b = _0x521125.messages[_0x2c2b6b.remoteJid];
          let _0x4e32b1;
          0x0;
          await baileys_1.delay(0x3e8);
          for (let _0x50401c = 0x0; _0x50401c < _0x8b789b.length; _0x50401c++) {
            if (_0x8b789b[_0x50401c].key.id === _0x2c2b6b.id) {
              _0x4e32b1 = _0x8b789b[_0x50401c];
              break;
            }
          }
          console.log(_0x4e32b1);
          if (_0x4e32b1 === undefined) {
            console.log("Message non trouver");
            return;
          }
          await _0x406241.sendMessage(_0x38a748, {
            'image': {
              'url': "./media/deleted-message.jpg"
            },
            'caption': "        😈Anti-delete-message😈\n Message venant de @" + _0x4e32b1.key.participant.split('@')[0x0] + '​',
            'mentions': [_0x4e32b1.key.participant]
          }).then(() => {
            _0x406241.sendMessage(_0x38a748, {
              'forward': _0x4e32b1
            }, {
              'quoted': _0x4e32b1
            });
          });
        } catch (_0x3303da) {
          console.log(_0x3303da);
        }
      }
      try {
        if (_0x56c149 && (_0xb4186c == 'conversation' || _0xb4186c == 'extendedTextMessage') && !_0x18b837) {
          if (_0x13db70 == "120363158701337904@g.us") {
            return;
          }
          if (_0x13db70 === "status@broadcast") {
            return;
          }
          const _0x794ba1 = require('./bdd/afk');
          if (_0x13db70.endsWith("@s.whatsapp.net")) {
            let _0x4c7202 = await _0x794ba1.getAfkById(0x1);
            if (_0x4c7202?.["etat"] == 'on') {
              const _0x21f1e4 = _0x42d66a.key?.['id']?.["startsWith"]('BAES') && _0x42d66a.key?.['id']?.["length"] === 0x10;
              const _0x409979 = _0x42d66a.key?.['id']?.['startsWith']("BAE5") && _0x42d66a.key?.['id']?.["length"] === 0x10;
              if (_0x21f1e4 || _0x409979) {
                return;
              }
              if (_0x42d66a.key.fromMe) {
                await _0x794ba1.changeAfkState(0x1, 'off');
                _0x4628bf("Etant donnee que vous etes de retour nous desactivons le Afk");
              } else if (_0x4c7202.lien == "no url") {
                _0x4628bf(_0x4c7202.message);
              } else {
                _0x406241.sendMessage(_0x13db70, {
                  'image': {
                    'url': _0x4c7202.lien
                  },
                  'caption': _0x4c7202.message
                }, {
                  'caption': _0x42d66a
                });
              }
            } else {
              if (conf.CHATBOT === 'oui') {
                if (_0x5e7bc6 || _0x42d66a.key.fromMe) {
                  return;
                }
                const _0x4b9602 = require("./framework/traduction");
                let _0x41f08c = await _0x4b9602(_0x56c149, {
                  'to': 'en'
                });
                fetch("http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=" + _0x41f08c).then(_0x478582 => _0x478582.json()).then(_0x371308 => {
                  const _0x278eff = _0x371308.cnt;
                  console.log(_0x278eff);
                  _0x4b9602(_0x278eff, {
                    'to': 'fr'
                  }).then(_0x161d3f => {
                    _0x4628bf(_0x161d3f);
                  })["catch"](_0x1fdc3d => {
                    console.error("Erreur lors de la traduction en français :", _0x1fdc3d);
                  });
                })["catch"](_0x27fb52 => {
                  console.error("Erreur lors de la requête à BrainShop :", _0x27fb52);
                });
              }
            }
          } else {
            let _0xe72ae4 = await _0x794ba1.getAfkById(0x1);
            if (_0xe72ae4?.["etat"] == 'on') {
              const _0x57fbd7 = _0x42d66a.key?.['id']?.["startsWith"]('BAES') && _0x42d66a.key?.['id']?.["length"] === 0x10;
              const _0xb3de1c = _0x42d66a.key?.['id']?.["startsWith"]("BAE5") && _0x42d66a.key?.['id']?.["length"] === 0x10;
              if (_0x57fbd7 || _0xb3de1c) {
                return;
              }
              if (_0x42d66a.key.fromMe) {
                await _0x794ba1.changeAfkState(0x1, "off");
                return _0x4628bf("Etant donnee que vous etes de retour nous desactivons le Afk");
              }
            }
            ;
            if (_0x42d66a.message[_0xb4186c]?.["contextInfo"]?.["mentionedJid"] && _0x42d66a.message[_0xb4186c]?.["contextInfo"]?.["mentionedJid"]['includes'](_0x38a748)) {
              let _0x1a88a8 = await _0x794ba1.getAfkById(0x1);
              if (_0x1a88a8?.["etat"] == 'on') {
                const _0x513a32 = _0x42d66a.key?.['id']?.["startsWith"]("BAES") && _0x42d66a.key?.['id']?.["length"] === 0x10;
                const _0x1ffc9a = _0x42d66a.key?.['id']?.["startsWith"]("BAE5") && _0x42d66a.key?.['id']?.['length'] === 0x10;
                if (_0x513a32 || _0x1ffc9a) {
                  return;
                }
                if (_0x1a88a8.lien == "no url") {
                  _0x4628bf(_0x1a88a8.message);
                } else {
                  _0x406241.sendMessage(_0x13db70, {
                    'image': {
                      'url': _0x1a88a8.lien
                    },
                    'caption': _0x1a88a8.message
                  }, {
                    'caption': _0x42d66a
                  });
                }
              } else {
                if (_0x5e7bc6) {
                  console.log('hummm');
                  return;
                }
                let _0x472fb7 = require('./bdd/mention');
                let _0x3886f3 = await _0x472fb7.recupererToutesLesValeurs();
                let _0x1bc118 = _0x3886f3[0x0];
                if (_0x1bc118.status === 'non') {
                  console.log("mention pas actifs");
                  return;
                }
                let _0x139320;
                if (_0x1bc118.type.toLocaleLowerCase() === "image") {
                  _0x139320 = {
                    'image': {
                      'url': _0x1bc118.url
                    },
                    'caption': _0x1bc118.message
                  };
                } else {
                  if (_0x1bc118.type.toLocaleLowerCase() === "video") {
                    _0x139320 = {
                      'video': {
                        'url': _0x1bc118.url
                      },
                      'caption': _0x1bc118.message
                    };
                  } else {
                    if (_0x1bc118.type.toLocaleLowerCase() === "sticker") {
                      let _0x3737f3 = new Sticker(_0x1bc118.url, {
                        'pack': conf.NOM_OWNER,
                        'type': StickerTypes.FULL,
                        'categories': ['🤩', '🎉'],
                        'id': "12345",
                        'quality': 0x46,
                        'background': 'transparent'
                      });
                      const _0x3953ee = await _0x3737f3.toBuffer();
                      _0x139320 = {
                        'sticker': _0x3953ee
                      };
                    } else if (_0x1bc118.type.toLocaleLowerCase() === "audio") {
                      _0x139320 = {
                        'audio': {
                          'url': _0x1bc118.url
                        },
                        'mimetype': "audio/mp4"
                      };
                    }
                  }
                }
                _0x406241.sendMessage(_0x13db70, _0x139320, {
                  'quoted': _0x42d66a
                });
              }
            }
          }
        }
      } catch (_0x44d945) {
        console.log(_0x44d945);
      }
      if (_0x42d66a.key && _0x42d66a.key.remoteJid === "status@broadcast" && conf.LECTURE_AUTO_STATUS === "oui") {
        await _0x406241.readMessages([_0x42d66a.key]);
      }
      if (_0x42d66a.key && _0x42d66a.key.remoteJid === "status@broadcast" && conf.TELECHARGER_AUTO_STATUS === 'oui') {
        if (_0x42d66a.message.extendedTextMessage) {
          var _0x581f7f = _0x42d66a.message.extendedTextMessage.text;
          await _0x406241.sendMessage(_0x38a748, {
            'text': _0x581f7f
          }, {
            'quoted': _0x42d66a
          });
        } else {
          if (_0x42d66a.message.imageMessage) {
            var _0x137b1c = _0x42d66a.message.imageMessage.caption;
            var _0x5b233e = await _0x406241.downloadAndSaveMediaMessage(_0x42d66a.message.imageMessage);
            await _0x406241.sendMessage(_0x38a748, {
              'image': {
                'url': _0x5b233e
              },
              'caption': _0x137b1c
            }, {
              'quoted': _0x42d66a
            });
          } else {
            if (_0x42d66a.message.videoMessage) {
              var _0x137b1c = _0x42d66a.message.videoMessage.caption;
              var _0x34a01c = await _0x406241.downloadAndSaveMediaMessage(_0x42d66a.message.videoMessage);
              await _0x406241.sendMessage(_0x38a748, {
                'video': {
                  'url': _0x34a01c
                },
                'caption': _0x137b1c
              }, {
                'quoted': _0x42d66a
              });
            }
          }
        }
      }
      if (_0x42d66a && _0x42d66a.message.stickerMessage) {
        const {
          addstickcmd: _0x8919a7,
          deleteCmd: _0x453b26,
          getCmdById: _0x3ef849,
          inStickCmd: _0x772aee
        } = require("./bdd/stickcmd");
        let _0x40d537 = _0x42d66a.message.stickerMessage.url;
        if (!_0x772aee(_0x40d537) || !_0x5e7bc6) {
          return;
        }
        let _0x31a08f = await _0x3ef849(_0x40d537);
        const _0x2814b6 = evt.cm.find(_0x2087ac => _0x2087ac.nomCom === _0x31a08f);
        if (_0x2814b6) {
          try {
            reagir(_0x13db70, _0x406241, _0x42d66a, _0x2814b6.reaction);
            _0x2814b6.fonction(_0x13db70, _0x406241, _0x561764);
          } catch (_0x2cb6e6) {
            console.log(_0x2cb6e6);
          }
        }
      }
      ;
      try {
        if (_0x42d66a.message[_0xb4186c]?.["contextInfo"]?.['mentionedJid'] && (_0x42d66a.message[_0xb4186c]?.["contextInfo"]?.["mentionedJid"]["includes"](_0x38a748) || _0x42d66a.message[_0xb4186c].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))) {
          if (_0x13db70 == '120363158701337904@g.us') {
            return;
          }
          ;
          if (_0x5e7bc6) {
            console.log('hummm');
            return;
          }
          let _0x2d9960 = require("./bdd/mention");
          let _0x1e1164 = await _0x2d9960.recupererToutesLesValeurs();
          let _0x299aa0 = _0x1e1164[0x0];
          if (_0x299aa0.status === 'non') {
            console.log("mention pas actifs");
            return;
          }
          let _0x4b8108;
          if (_0x299aa0.type.toLocaleLowerCase() === "image") {
            _0x4b8108 = {
              'image': {
                'url': _0x299aa0.url
              },
              'caption': _0x299aa0.message
            };
          } else {
            if (_0x299aa0.type.toLocaleLowerCase() === "video") {
              _0x4b8108 = {
                'video': {
                  'url': _0x299aa0.url
                },
                'caption': _0x299aa0.message
              };
            } else {
              if (_0x299aa0.type.toLocaleLowerCase() === "sticker") {
                let _0x353739 = new Sticker(_0x299aa0.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x54e071 = await _0x353739.toBuffer();
                _0x4b8108 = {
                  'sticker': _0x54e071
                };
              } else if (_0x299aa0.type.toLocaleLowerCase() === "audio") {
                _0x4b8108 = {
                  'audio': {
                    'url': _0x299aa0.url
                  },
                  'mimetype': 'audio/mp4'
                };
              }
            }
          }
          _0x406241.sendMessage(_0x13db70, _0x4b8108, {
            'quoted': _0x42d66a
          });
        }
      } catch (_0x39c64d) {}
      if (_0x56c149 && _0x48d567.endsWith('s.whatsapp.net')) {
        const {
          ajouterOuMettreAJourUserData: _0x1bf850
        } = require("./bdd/level");
        try {
          await _0x1bf850(_0x48d567);
        } catch (_0x3304e5) {
          console.error(_0x3304e5);
        }
      }
      try {
        const _0x47a1d6 = await verifierEtatJid(_0x13db70);
        if ((_0x56c149.includes('https://') || _0x56c149.includes("http://")) && _0x1dbaa0 && _0x47a1d6) {
          console.log("lien detecté");
          var _0x1b2ab0 = _0x1dbaa0 ? _0x35146a.includes(_0x38a748) : false;
          if (_0x5e7bc6 || _0x4b513a || !_0x1b2ab0) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1cd21e = {
            'remoteJid': _0x13db70,
            'fromMe': false,
            'id': _0x42d66a.key.id,
            'participant': _0x48d567
          };
          var _0x214015 = "lien détecté, \n";
          var _0x26d3cf = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "Zoou-Md",
            'author': conf.NOM_OWNER,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x26d3cf.toFile('st1.webp');
          var _0x176216 = await recupererActionJid(_0x13db70);
          if (_0x176216 === 'retirer') {
            _0x214015 += "message supprimé \n @" + _0x48d567.split('@')[0x0] + " rétiré du groupe.";
            await _0x406241.sendMessage(_0x13db70, {
              'sticker': fs.readFileSync("st1.webp")
            }, {
              'quoted': _0x42d66a
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x406241.sendMessage(_0x13db70, {
              'text': _0x214015,
              'mentions': [_0x48d567]
            }, {
              'quoted': _0x42d66a
            });
            try {
              await _0x406241.groupParticipantsUpdate(_0x13db70, [_0x48d567], "remove");
            } catch (_0x5d19d1) {
              console.log("antiien ") + _0x5d19d1;
            }
            await _0x406241.sendMessage(_0x13db70, {
              'delete': _0x1cd21e
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x176216 === 'supp') {
              _0x214015 += "message supprimé \n @" + _0x48d567.split('@')[0x0] + " veillez eviter d'envoyer des lien.";
              await _0x406241.sendMessage(_0x13db70, {
                'text': _0x214015,
                'mentions': [_0x48d567]
              }, {
                'quoted': _0x42d66a
              });
              await _0x406241.sendMessage(_0x13db70, {
                'delete': _0x1cd21e
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x176216 === "warn") {
                const {
                  getWarnCountByJID: _0x53cc59,
                  ajouterUtilisateurAvecWarnCount: _0x1d8396
                } = require("./bdd/warn");
                let _0x21eb02 = await _0x53cc59(_0x48d567);
                let _0x443e3a = conf.WARN_COUNT;
                if (_0x21eb02 >= _0x443e3a) {
                  var _0x338a0e = "Lien detecté ; vous avez atteint le nombre maximal d'avertissement par consequant vous serrez retiré du groupe";
                  await _0x406241.sendMessage(_0x13db70, {
                    'text': _0x338a0e,
                    'mentions': [_0x48d567]
                  }, {
                    'quoted': _0x42d66a
                  });
                  await _0x406241.groupParticipantsUpdate(_0x13db70, [_0x48d567], "remove");
                  await _0x406241.sendMessage(_0x13db70, {
                    'delete': _0x1cd21e
                  });
                } else {
                  var _0x4f27ac = _0x443e3a - _0x21eb02;
                  var _0x27f355 = "Lien detecté , vous avez un avertissement en plus dans votre casier ;\n passez encore " + _0x4f27ac + " avertissement(s) et vous serrez viré du groupe";
                  await _0x1d8396(_0x48d567);
                  await _0x406241.sendMessage(_0x13db70, {
                    'text': _0x27f355,
                    'mentions': [_0x48d567]
                  }, {
                    'quoted': _0x42d66a
                  });
                  await _0x406241.sendMessage(_0x13db70, {
                    'delete': _0x1cd21e
                  });
                }
              }
            }
          }
        }
      } catch (_0x133676) {
        console.log("bdd err " + _0x133676);
      }
      try {
        const _0x4f4dcd = _0x42d66a.key?.['id']?.["startsWith"]("BAES") && _0x42d66a.key?.['id']?.["length"] === 0x10;
        const _0x26ce39 = _0x42d66a.key?.['id']?.["startsWith"]("BAE5") && _0x42d66a.key?.['id']?.['length'] === 0x10;
        if (_0x4f4dcd || _0x26ce39) {
          if (_0xb4186c === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          const _0x2c8c30 = await atbverifierEtatJid(_0x13db70);
          if (!_0x2c8c30) {
            return;
          }
          ;
          if (_0x4b513a || _0x48d567 === _0x38a748) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x46beec = {
            'remoteJid': _0x13db70,
            'fromMe': false,
            'id': _0x42d66a.key.id,
            'participant': _0x48d567
          };
          var _0x214015 = "bot détecté, \n";
          var _0x26d3cf = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "Zoou-Md",
            'author': conf.NOM_OWNER,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x26d3cf.toFile("st1.webp");
          var _0x176216 = await atbrecupererActionJid(_0x13db70);
          if (_0x176216 === "retirer") {
            try {
              _0x214015 += "message supprimé \n @" + _0x48d567.split('@')[0x0] + " rétiré du groupe.";
              await _0x406241.sendMessage(_0x13db70, {
                'sticker': fs.readFileSync('st1.webp')
              }, {
                'quoted': _0x42d66a
              });
              0x0;
              baileys_1.delay(0x320);
              await _0x406241.sendMessage(_0x13db70, {
                'text': _0x214015,
                'mentions': [_0x48d567]
              }, {
                'quoted': _0x42d66a
              });
              await _0x406241.groupParticipantsUpdate(_0x13db70, [_0x48d567], "remove");
              await _0x406241.sendMessage(_0x13db70, {
                'delete': _0x46beec
              });
              await fs.unlink("st1.webp");
            } catch (_0x2efecc) {
              console.log("antibot " + _0x2efecc);
            }
          } else {
            if (_0x176216 === "supp") {
              _0x214015 += "message supprimé \n @" + _0x48d567.split('@')[0x0] + " veillez eviter d'utiliser des bots.";
              await _0x406241.sendMessage(_0x13db70, {
                'text': _0x214015,
                'mentions': [_0x48d567]
              }, {
                'quoted': _0x42d66a
              });
              await _0x406241.sendMessage(_0x13db70, {
                'delete': _0x46beec
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x176216 === "warn") {
                const {
                  getWarnCountByJID: _0x1a8d1a,
                  ajouterUtilisateurAvecWarnCount: _0x141007
                } = require("./bdd/warn");
                let _0x28c98f = await _0x1a8d1a(_0x48d567);
                let _0x5cf104 = conf.WARN_COUNT;
                if (_0x28c98f >= _0x5cf104) {
                  var _0x338a0e = "bot detecté ; vous avez atteint le nombre maximal d'avertissement par consequant vous serrez retiré du groupe";
                  await _0x406241.sendMessage(_0x13db70, {
                    'text': _0x338a0e,
                    'mentions': [_0x48d567]
                  }, {
                    'quoted': _0x42d66a
                  });
                  await _0x406241.groupParticipantsUpdate(_0x13db70, [_0x48d567], 'remove');
                  await _0x406241.sendMessage(_0x13db70, {
                    'delete': _0x46beec
                  });
                } else {
                  var _0x4f27ac = _0x5cf104 - _0x28c98f;
                  var _0x27f355 = "bot detecté , vous avez un avertissement en plus dans votre casier ;\n passez encore " + _0x4f27ac + " avertissement(s) et vous serrez viré du groupe";
                  await _0x141007(_0x48d567);
                  await _0x406241.sendMessage(_0x13db70, {
                    'text': _0x27f355,
                    'mentions': [_0x48d567]
                  }, {
                    'quoted': _0x42d66a
                  });
                  await _0x406241.sendMessage(_0x13db70, {
                    'delete': _0x46beec
                  });
                }
              }
            }
          }
        }
      } catch (_0x1a2b57) {
        console.log(".... " + _0x1a2b57);
      }
      if (_0x18b837) {
        const _0x259031 = evt.cm.find(_0x2c4d12 => _0x2c4d12.nomCom === _0x447db2);
        if (_0x259031) {
          if (conf.MODE != 'oui' && !_0x5e7bc6) {
            return;
          }
          if (!_0x3e55c9 && _0x13db70 == "120363158701337904@g.us") {
            return;
          }
          if (!_0x5e7bc6 && _0x13db70 === _0x48d567 && conf.PM_PERMIT === 'oui') {
            return;
          }
          if (_0x18b837 && !_0x5e7bc6) {
            let _0xa1a706 = await isGroupBanned(_0x13db70);
            if (_0xa1a706) {
              return;
            }
          }
          if (!_0x4b513a && _0x1dbaa0) {
            let _0x50eceb = await isGroupOnlyAdmin(_0x13db70);
            if (_0x50eceb) {
              return;
            }
          }
          if (!_0x5e7bc6) {
            let _0x445f09 = await isUserBanned(_0x48d567);
            if (_0x445f09) {
              _0x4628bf("Vous n'avez plus acces au commandes du bots");
              return;
            }
          }
          ;
          try {
            reagir(_0x13db70, _0x406241, _0x42d66a, _0x259031.reaction);
            _0x259031.fonction(_0x13db70, _0x406241, _0x561764);
          } catch (_0x596bda) {
            console.log("😡😡 " + _0x596bda);
            _0x406241.sendMessage(_0x13db70, {
              'text': "😡😡 " + _0x596bda
            }, {
              'quoted': _0x42d66a
            });
          }
        }
      }
      ;
    });
    _0x406241.ev.on('group-participants.update', async _0x1bb1f6 => {
      const _0xced179 = _0x34124f => {
        if (!_0x34124f) {
          return _0x34124f;
        }
        if (/:\d+@/gi.test(_0x34124f)) {
          0x0;
          let _0x35aa07 = baileys_1.jidDecode(_0x34124f) || {};
          return _0x35aa07.user && _0x35aa07.server && _0x35aa07.user + '@' + _0x35aa07.server || _0x34124f;
        } else {
          return _0x34124f;
        }
      };
      console.log(_0x1bb1f6);
      let _0x1abc47;
      try {
        _0x1abc47 = await _0x406241.profilePictureUrl(_0x1bb1f6.id, "image");
      } catch {
        _0x1abc47 = 'https://telegra.ph/file/4cc2712eee93c105f6739.jpg';
      }
      try {
        const _0x1f5947 = await _0x406241.groupMetadata(_0x1bb1f6.id);
        if (_0x1bb1f6.action == 'add' && (await recupevents(_0x1bb1f6.id, "welcome")) == "oui") {
          let _0x2e7185 = "╔════◇◇◇═════╗\n    ║ Souhaitons la bienvenue au(x) nouveau(x) membre(s)\n    ║ *Nouveau(x) Membre(s) :*\n    ";
          let _0x4af609 = _0x1bb1f6.participants;
          for (let _0x47a5bc of _0x4af609) {
            _0x2e7185 += "║ @" + _0x47a5bc.split('@')[0x0] + "\n";
          }
          _0x2e7185 += "║\n    ╚════◇◇◇═════╝\n    ◇ *Description*   ◇\n    \n    " + _0x1f5947.desc;
          _0x406241.sendMessage(_0x1bb1f6.id, {
            'image': {
              'url': _0x1abc47
            },
            'caption': _0x2e7185,
            'mentions': _0x4af609
          });
        } else {
          if (_0x1bb1f6.action == 'remove' && (await recupevents(_0x1bb1f6.id, 'goodbye')) == 'oui') {
            let _0x33d5c2 = "Un ou des membres vient(nent) de quitter le groupe;\n";
            let _0x1b2c3c = _0x1bb1f6.participants;
            for (let _0x30e405 of _0x1b2c3c) {
              _0x33d5c2 += '@' + _0x30e405.split('@')[0x0] + "\n";
            }
            _0x406241.sendMessage(_0x1bb1f6.id, {
              'text': _0x33d5c2,
              'mentions': _0x1b2c3c
            });
          } else {
            if (_0x1bb1f6.action == "promote" && (await recupevents(_0x1bb1f6.id, "antipromote")) == 'oui') {
              if (_0x1bb1f6.author == _0x1f5947.owner || _0x1bb1f6.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x1bb1f6.author == _0xced179(_0x406241.user.id) || _0x1bb1f6.author == _0x1bb1f6.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x406241.groupParticipantsUpdate(_0x1bb1f6.id, [_0x1bb1f6.author, _0x1bb1f6.participants[0x0]], "demote");
              _0x406241.sendMessage(_0x1bb1f6.id, {
                'text': '@' + _0x1bb1f6.author.split('@')[0x0] + " a enfreinst la règle de l'antipromote par consequent lui et @" + _0x1bb1f6.participants[0x0].split('@')[0x0] + " ont été demis des droits d'aministration",
                'mentions': [_0x1bb1f6.author, _0x1bb1f6.participants[0x0]]
              });
            } else {
              if (_0x1bb1f6.action == 'demote' && (await recupevents(_0x1bb1f6.id, "antidemote")) == "oui") {
                if (_0x1bb1f6.author == _0x1f5947.owner || _0x1bb1f6.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x1bb1f6.author == _0xced179(_0x406241.user.id) || _0x1bb1f6.author == _0x1bb1f6.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x406241.groupParticipantsUpdate(_0x1bb1f6.id, [_0x1bb1f6.author], "demote");
                await _0x406241.groupParticipantsUpdate(_0x1bb1f6.id, [_0x1bb1f6.participants[0x0]], "promote");
                _0x406241.sendMessage(_0x1bb1f6.id, {
                  'text': '@' + _0x1bb1f6.author.split('@')[0x0] + " a enfreint la règle de l'antidemote car il a denommer @" + _0x1bb1f6.participants[0x0].split('@')[0x0] + " par consequent , il est demit des droits d'aministration",
                  'mentions': [_0x1bb1f6.author, _0x1bb1f6.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x2a5c0b) {
        console.error(_0x2a5c0b);
      }
    });
    async function _0x1e4a85() {
      const _0xa4c35f = require("node-cron");
      const {
        getCron: _0x1149d2
      } = require('./bdd/cron');
      let _0xcd8d9e = await _0x1149d2();
      console.log(_0xcd8d9e);
      if (_0xcd8d9e.length > 0x0) {
        for (let _0x1fb1f9 = 0x0; _0x1fb1f9 < _0xcd8d9e.length; _0x1fb1f9++) {
          if (_0xcd8d9e[_0x1fb1f9].mute_at != null) {
            let _0xc5e31a = _0xcd8d9e[_0x1fb1f9].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0xcd8d9e[_0x1fb1f9].group_id + " a " + _0xc5e31a[0x0] + " H " + _0xc5e31a[0x1]);
            _0xa4c35f.schedule(_0xc5e31a[0x1] + " " + _0xc5e31a[0x0] + " * * *", async () => {
              await _0x406241.groupSettingUpdate(_0xcd8d9e[_0x1fb1f9].group_id, 'announcement');
              _0x406241.sendMessage(_0xcd8d9e[_0x1fb1f9].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Coucou c'est l'heure de fermer le groupe ; sayonnara "
              });
            }, {
              'timezone': "Africa/Abidjan"
            });
          }
          if (_0xcd8d9e[_0x1fb1f9].unmute_at != null) {
            let _0x3c399e = _0xcd8d9e[_0x1fb1f9].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x3c399e[0x0] + " H " + _0x3c399e[0x1] + " ");
            _0xa4c35f.schedule(_0x3c399e[0x1] + " " + _0x3c399e[0x0] + " * * *", async () => {
              await _0x406241.groupSettingUpdate(_0xcd8d9e[_0x1fb1f9].group_id, "not_announcement");
              _0x406241.sendMessage(_0xcd8d9e[_0x1fb1f9].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Ohayo gosaimasu ; C'est l'heure d'ouvrir le groupe "
              });
            }, {
              'timezone': 'Africa/Abidjan'
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x406241.ev.on("contacts.upsert", async _0x589079 => {
      const _0x296c17 = _0x205739 => {
        for (const _0x571699 of _0x205739) {
          if (store.contacts[_0x571699.id]) {
            Object.assign(store.contacts[_0x571699.id], _0x571699);
          } else {
            store.contacts[_0x571699.id] = _0x571699;
          }
        }
        return;
      };
      _0x296c17(_0x589079);
    });
    _0x406241.ev.on("connection.update", async _0x2efcb1 => {
      const {
        lastDisconnect: _0x14041d,
        connection: _0x2c504f,
        receivedPendingNotifications: _0x29ec7c
      } = _0x2efcb1;
      if (_0x2c504f === "connecting") {
        console.log("ℹ️ Connexion en cours...");
      } else {
        if (_0x2c504f === 'open') {
          console.log("✅ connexion reussie! ☺️");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log('------------------/-----');
          console.log("le bot est en ligne 🕸\n\n");
          console.log("chargement des commandes ...\n");
          fs.readdirSync(__dirname + '/commandes').forEach(_0x4c2842 => {
            if (path.extname(_0x4c2842).toLowerCase() == ".js") {
              try {
                require(__dirname + "/commandes/" + _0x4c2842);
                console.log(_0x4c2842 + " installé ✔️");
              } catch (_0x30eb4b) {
                console.log(_0x4c2842 + " n'a pas pu être chargé pour les raisons suivantes : " + _0x30eb4b);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x5f294b;
          if (conf.MODE.toLowerCase() === "oui") {
            _0x5f294b = "public";
          } else if (conf.MODE.toLowerCase() === "non") {
            _0x5f294b = "privé";
          } else {
            _0x5f294b = "indéfini";
          }
          console.log("chargement des commandes terminé ✅");
          await _0x1e4a85();
          if (conf.DP.toLowerCase() === "oui") {
            let _0x20d61b = "╔════◇\n║ 『𝐙𝐨𝐤𝐨𝐮-𝐌𝐃』\n║    Prefix : [ " + prefixe + " ]\n║    Mode :" + _0x5f294b + "\n║    Nombre total de Commandes : " + evt.cm.length + "︎\n╚══════════════════╝\n  \n╔═════◇\n║『𝗯𝘆 Djalega++』\n║ \n╚══════════════════╝";
            await _0x406241.sendMessage(_0x406241.user.id, {
              'text': _0x20d61b
            });
          }
        } else {
          if (_0x2c504f == 'close') {
            let _0x1210b6 = new boom_1.Boom(_0x14041d?.["error"])?.["output"]["statusCode"];
            if (_0x1210b6 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id érronée veuillez rescanner le qr svp ...");
            } else {
              if (_0x1210b6 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
              } else {
                if (_0x1210b6 === baileys_1.DisconnectReason.loggedOut) {
                  console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
                } else {
                  console.log("redemarrage sur le coup de l'erreur  ", _0x1210b6);
                  const {
                    exec: _0x498e66
                  } = require("child_process");
                  _0x498e66("pm2 restart all");
                }
              }
            }
            console.log("hum " + _0x2c504f);
            _0x3e4a0f();
          }
        }
      }
    });
    _0x406241.ev.on('creds.update', _0x424501);
    _0x406241.downloadAndSaveMediaMessage = async (_0x93b90d, _0x2f6ead = '', _0x5c2a58 = true) => {
      let _0x224bb6 = _0x93b90d.msg ? _0x93b90d.msg : _0x93b90d;
      let _0x2cdb9b = (_0x93b90d.msg || _0x93b90d).mimetype || '';
      let _0x393963 = _0x93b90d.mtype ? _0x93b90d.mtype.replace(/Message/gi, '') : _0x2cdb9b.split('/')[0x0];
      0x0;
      const _0x492eec = await baileys_1.downloadContentFromMessage(_0x224bb6, _0x393963);
      let _0xe5eab1 = Buffer.from([]);
      for await (const _0x5c374b of _0x492eec) {
        _0xe5eab1 = Buffer.concat([_0xe5eab1, _0x5c374b]);
      }
      let _0x3ea361 = await FileType.fromBuffer(_0xe5eab1);
      let _0x5cf712 = './' + _0x2f6ead + '.' + _0x3ea361.ext;
      await fs.writeFileSync(_0x5cf712, _0xe5eab1);
      return _0x5cf712;
    };
    _0x406241.awaitForMessage = async (_0x3869b7 = {}) => {
      return new Promise((_0x1ac062, _0x105603) => {
        if (typeof _0x3869b7 !== "object") {
          _0x105603(new Error("Options must be an object"));
        }
        if (typeof _0x3869b7.sender !== 'string') {
          _0x105603(new Error("Sender must be a string"));
        }
        if (typeof _0x3869b7.chatJid !== "string") {
          _0x105603(new Error("ChatJid must be a string"));
        }
        if (_0x3869b7.timeout && typeof _0x3869b7.timeout !== 'number') {
          _0x105603(new Error("Timeout must be a number"));
        }
        if (_0x3869b7.filter && typeof _0x3869b7.filter !== "function") {
          _0x105603(new Error("Filter must be a function"));
        }
        const _0x5a5c25 = _0x3869b7?.['timeout'] || undefined;
        const _0x3432cd = _0x3869b7?.["filter"] || (() => true);
        let _0x708193 = undefined;
        let _0x267c01 = _0x289f6b => {
          let {
            type: _0x46c8b5,
            messages: _0x47119c
          } = _0x289f6b;
          if (_0x46c8b5 == "notify") {
            for (let _0x5d231b of _0x47119c) {
              const _0x59ea57 = _0x5d231b.key.fromMe;
              const _0x226289 = _0x5d231b.key.remoteJid;
              const _0x1d7a87 = _0x226289.endsWith("@g.us");
              const _0x856d6a = _0x226289 == "status@broadcast";
              const _0x222ec1 = _0x59ea57 ? _0x406241.user.id.replace(/:.*@/g, '@') : _0x1d7a87 || _0x856d6a ? _0x5d231b.key.participant.replace(/:.*@/g, '@') : _0x226289;
              if (_0x222ec1 == _0x3869b7.sender && _0x226289 == _0x3869b7.chatJid && _0x3432cd(_0x5d231b)) {
                _0x406241.ev.off('messages.upsert', _0x267c01);
                clearTimeout(_0x708193);
                _0x1ac062(_0x5d231b);
              }
            }
          }
        };
        _0x406241.ev.on("messages.upsert", _0x267c01);
        if (_0x5a5c25) {
          _0x708193 = setTimeout(() => {
            _0x406241.ev.off("messages.upsert", _0x267c01);
            _0x105603(new Error("Timeout"));
          }, _0x5a5c25);
        }
      });
    };
    _0x406241.getMessage = async _0x48fbee => {
      if (store) {
        const _0x40dcda = await store.loadMessage(_0x48fbee.remoteJid, _0x48fbee.id, undefined);
        return _0x40dcda.message || undefined;
      }
      return {
        'conversation': "An Error Occurred, Repeat Command!"
      };
    };
    _0x406241.getLastMessageInChat = async _0x19c6a8 => {
      let _0x2d0fee = fs.readFileSync("store.json", "utf-8");
      let _0x1e0a7e = JSON.parse(_0x2d0fee);
      return _0x1e0a7e?.["messages"] && _0x1e0a7e?.["messages"][_0x19c6a8] ? _0x1e0a7e.messages[_0x19c6a8][_0x1e0a7e.messages[_0x19c6a8].length - 0x1] : undefined;
    };
    return _0x406241;
  }
  let _0x277d85 = require.resolve(__filename);
  fs.watchFile(_0x277d85, () => {
    fs.unwatchFile(_0x277d85);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x277d85];
    require(_0x277d85);
  });
  _0x3e4a0f();
}, 0x1388);
