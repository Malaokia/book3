---
layout: layout.hbs
---

# Hackathon - Business Locations

You are approached by a business developer to get advice on where to build a
new store in Phoenix, AZ. There are currently six candidates. Use the Yelp
dataset and come up with your own scoring scheme to identify the best location
to recommend.

## Report

[Read the Report](report.html)

## Business Types
As a team, choose one of the following business types to work on:

- A new full-service daycare center
- A new full-service car wash
- A new 24-hours gym
- A new 24-hours diner
- A new swimming pool
- A new organic food store
- A new sushi buffet

## Scoring Method

For this hackathon, you will use a scoring method that is based on a series of
20 Yes/No questions that can be applied to each candidate location. The candidate
location that has the most number of Yes's is the most viable location.

Each Yes/No question generally should take on the form of

  _Does the location have X nearby?_

where X is a feature that you think would be useful for the business to be viable.

Two examples of such questions are:
1. Does the location have _at least one McDonald's within one mile_?
1. Does the location have _at least ten businesses with 100 or more reviews within one mile_?

## Coding

Implement scoring functions and visualize how these candidate locations are
scored. The skeleton code is provided for you in [report.html](report.html).

## Grading

Each person must implement at least two questions to receive credits for this
hackathon.

## Submissions

### Business Type

Our team chose to analyze candidate locations for a full service daycare center.

### Contributors

The team members who contributed to this hackathon are:

- Brian McKean
- Karen Blakemore
- Mingqi Liew

### 20 Questions

Our team came up with the following relevant questions:
##### 1. Does the location have an elementary school within 1 mile? Contributed by Ming
Many families of daycare age children also have children in elementary schools.  By locating the daycare close to elementary schools, we can reduce the driving time and distance for parents.
##### 2. Does the location have a coffee shop within 1/4 mile? Contributed by Brian
So the parent can stop for coffee on the way to work.
##### 3. Does the location have no dive bars within one mile? Contributed by Karen
We are looking for a safe location for the daycare center.
##### 4. Does the location have a gas station within 1 mile? Contributed by Brian
So the parent can get gas while picking up or dropping off child.
##### 5. Does the location have a restaraunt that is good for breakfast within 1 mile? Contributed Brian
So the parent can get a good breakfast with the child before dropping them off.
##### 6. Does the location have no childcare within 3 miles? Contributed by Ming
This question was chosen to reduce competition with other childcare centers.
##### 7. Does the location have no adult entertainment within one mile? Contributed by Karen
Adult entertainment businesses would not be conducive to a safe environment.
##### 8. Does the location have no fast food within one mile? Contributed by  Karen
Fast food locations would indicate a commercial environment and we are looking for a more residential setting.
##### 9. Does the location have urgent care pediatricians with greater than 4 stars rating within  3 miles? Contributed by Ming
f a child needs urgent medical care while in school, having a pediatrician that could be reached quickly is important.
##### 10. Does the location have at least one hipster wine bar within 5 miles? Contributed by  Brian
Just in case the parent needs to relax a bit just before picking up the child.
##### 11. Does the location have no late night businesses within one fourth mile? Contributed by Karen
Businesses which are open 24 hours or close after 12 pm, could indicate an unsafe environment.

### Conclusion

Our team collectively has implemented 11 scoring functions. Based on
the scores, our team recommends location 5 which received 7 out of 11 points.
