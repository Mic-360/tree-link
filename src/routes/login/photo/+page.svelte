<script lang="ts">
  import { AuthCheck } from '$lib/components';
  import { user, userData } from '$lib/store';
  import { storage, db } from '$lib/firebase.config';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { doc, updateDoc } from 'firebase/firestore';
  import * as Card from '$lib/components/ui/card';
  import { FilePlus2 } from 'lucide-svelte';
  import { Progress } from '$lib/components/ui/progress';
  import { Button } from '$lib/components/ui/button';

  let preview: string;
  let uploading = false;

  async function upload(e: any) {
    uploading = true;
    const file = e.target.files[0];
    preview = URL.createObjectURL(file);

    const storageRef = ref(storage, `users/${$user!.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    const userRef = doc(db, 'users', $user!.uid);
    await updateDoc(userRef, {
      photoURL: url
    });

    uploading = false;
  }
</script>

<AuthCheck>
  <Card.Root class="shadow-2xl shadow-accent p-8 space-y-4">
    <Card.Title class="text-xl flex flex-col gap-y-2 items-center">
      <img
        src={preview ?? $userData?.photoURL ?? $user?.photoURL}
        alt="profile"
        class="rounded-md h-32 w-32 object-cover"
      />
      <span>Upload an Avatar</span>
    </Card.Title>
    <Card.Content class="max-w-lg text-center">
      <div
        class="relative flex flex-col items-center justify-center border border-dashed border-accent rounded-lg p-8 gap-4"
      >
        <FilePlus2 class="h-10 w-10 mt-8" />
        <span class="text-muted-foreground text-center text-sm">
          Drag 'n' drop files here, or click to select files
        </span>
        <input
          id="inputFile"
          type="file"
          on:change={upload}
          name="photoURL"
          accept="image/*"
          class="absolute bg-transparent z-10 h-full w-full hover:bg-muted-foreground/20 rounded-lg placeholder-none"
        />
        {#if uploading}
          <Progress value={33} />
        {/if}
      </div>
    </Card.Content>
    <Card.Footer class="flex flex-col items-center">
      <Button type="submit" variant={'outline'} class="px-6 py-3 hover:shadow-2xl shadow-accent">
        <a href={`/${$userData?.username}`} class="flex gap-x-2 items-center">Continue</a></Button
      >
    </Card.Footer>
  </Card.Root>
</AuthCheck>
