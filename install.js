var Service = require('node-windows').Service;

var args = process.argv.slice(2);
if (args.length < 3) {
    console.log('Expecting 3 arguments but got ' + args.length);
    return;
}

var name, description, script, operation;
console.log(args);

args.forEach(function(a) {
    var parts = a.split('=');
    if (parts.length === 1) {
        if (a === 'i' || a === 'u') {
            operation = a;
        }

        return;
    }

    var argName = parts[0];
    var argValue = parts[1];

    if (argName === 'n') {
        name = argValue;
    } else if (argName === 'd') {
        description = argValue;
    } else if (argName === 's') {
        script = argValue;
    }
});

// Create a new service object
var svc = new Service({
    name: name,
    description: description,
    script: script
});

svc.on('start', function() {
    console.log('== Started == ' + svc.name);
});

svc.on('stop', function() {
    console.log('== Stopped == ' + svc.name);
});

svc.on('install', function() {
    console.log('== Installed == ' + svc.name);
    svc.start();
});

svc.on('alreadyinstalled', function() {
    console.log('== Warning == ' + svc.name + ' is already installed');
});

svc.on('uninstall', function() {
    console.log('== Uninstalled == ' + svc.name);
});

svc.on('error', function() {
    console.log('== Error == an error has occured');
});

if (operation === 'i') {
    svc.install();
} else if (operation === 'u') {
    svc.uninstall();
}