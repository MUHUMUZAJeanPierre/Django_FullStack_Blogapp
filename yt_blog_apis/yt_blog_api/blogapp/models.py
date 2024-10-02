
from django.db import models
from django.utils.text import slugify

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    # the value of slug field comes from title field
    slug = models.SlugField(unique=True, null=True, blank=True)

    def __str__(self):
        return self.title

# thi code getting the value of title and then giving it down and then passing it as slug field value
    def save(self, *args, **kwargs):
        if not self.slug:
             # Create the initial slug from the title
            self.slug = slugify(self.title)
            unique_slug = self.slug
            counter = 1
            # Check if the slug already exists in the database and modify it if necessary
            while Post.objects.filter(slug=unique_slug).exists():
                unique_slug = f'{self.slug}-{counter}'
                counter += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)