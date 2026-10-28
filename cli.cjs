#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),P=require('./engine.js');
try{const [file,format='json']=process.argv.slice(2);if(!file||!['json','csv','ics'].includes(format))throw Error('Usage: node cli.cjs plan.json [json|csv|ics]');if(fs.statSync(file).size>100000)throw Error('Input limit 100 KB.');const input=JSON.parse(fs.readFileSync(file,'utf8'));const plan=P.schedule(input);process.stdout.write(format==='csv'?P.csv(plan):format==='ics'?P.calendar(plan):JSON.stringify({plan,...(input.asOf?{review:P.review(plan,input.asOf)}:{})},null,2)+'\n');}catch(e){process.stderr.write(e.message+'\n');process.exitCode=1;}
