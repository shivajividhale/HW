#HW0

## Introduction to Sequence
### Level 1:
```
git commit -m “c2”
git commit c3 -m “c3”
```
### Level 2:
```
git checkout -b bugFix
```

### Level 3:
```
git checkout -b bugFix
git commit -m “c”
git checkout master
git commit -m “cc”
git merge bugFix
```

### Level 4:
```
git checkout -b bugFix
git commit -m “message”
git checkout master
git commit -m “message from master”
git checkout bugFix
git rebase master
```

## Ramping Up
### Level rampup1:
```
git checkout bugFix
git checkout C4
```

### Level rampup2:
```
git checkout bugFix
git checkout HEAD^
```

### Level rampup3:
```
git branch -f master C6
git branch -f bugFix C0
git checkout C1
```

### Level rampup4:
```
git reset HEAD~1
git checkout pushed
git revert HEAD
```

### Progress
![image](https://github.com/shivajividhale/HW/blob/master/HW0/Git_summup.PNG)

###Git hook gif:
![image](https://github.com/shivajividhale/HW/blob/master/HW0/savidhal_HW0.gif)