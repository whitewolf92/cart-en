# Decisions

1.  Did not use Redux. I'd use Redux if:
    -   state requires more drilling down. Component levels are pretty shallow and very manageable without Redux. Aim to keep things as shallow as possible as an overarching design practice.
    -   state contains nested objects. Updating nested data can make code look pretty messy. However, nested data could be a code smell, so this should only be a factor if absolutely necessary.
