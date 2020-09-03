const shell = require('shelljs');

shell.cd('client');
shell.exec('ng build --prod --aot=false');
shell.cd('..');
shell.exec('rm -rf server/public/* ');
shell.exec('cp client/dist/* server/public');
shell.echo('Done...COMPILACIÓN TERMINADA!!!');
shell.exec('git add .');
shell.exec('git commit -m deploy');
shell.exec('git push origin master');
shell.echo('Done...SUBIDO A MASTER');
shell.exec('git subtree push --prefix=server heroku master');
shell.echo('Done...Subido a Heroku')
