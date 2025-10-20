# JavaScript furniture library




## Sides/directions naming

Only bottom and back share the first letter when considering common words used.



| alternative | Preferred                                   |
| ----------- | ------------------------------------------- |
|             | **T**op                                     |
|             | **B**ottom                                  |
| **N**orth   | **H**inder (back because letter b is taken) |
| **S**outh   | **F**ront                                   |
| **W**est    | **L**eft                                    |
| **E**ast    | **R**ight                                   |

Sides class handles this so you can use both variants when creating and reading sides. In 2d space we tend to use **T**op **R**ight **B**ottom **L**eft (CSS for example for margins and padding). **H**inder might feel strange, but we can not use word Back as letter **B** is taken by **B**ottom.

## Cabinet shell configurations

To, Right, Bottom, and Left sides are considered the cabinet shell and there are 16 variants (some may be equivalent when rotated, even more if width and height are identical).



