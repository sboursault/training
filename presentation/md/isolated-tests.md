
<!-- .slide: id="good-tests" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 7</span>
  <h1>Isolated tests</h1>
</div>

---


## What is tests isolation?

Isolated tests can run in any order

Ultimately, they can even run in parallel :)

---

en bonus: utiliser des comptes différents pour chaque fichier de spec

---

## Verify the free delivery on a created product


- basket amount bellow 30€ -> delivery fees are charged 7€
- basket amount equals 30€ -> delivery fees are charged 7€
- basket amount over 30€   -> delivery fees offered

http://localhost:8000/api/register/
