// controllers/tracks.js

const express = require("express");
const Track = require("../models/track.js");
const router = express.Router();

// POST - /tracks create a track
router.post('/', async (req, res) => {
    try {
        const createdTrack = await Track.create(req.body);
        res.status(201).json(createdTrack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - /tracks list all tracks
router.get('/', async (req, res) => {
    try {
        const tracks = await Track.find();
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - /:trackId get a single track
router.get('/:trackId', async (req, res) => {
    console.log(req.params.trackId);
    try {
        const track = await Track.findById(req.params.trackId);

        if (!track) {
            res.status(404);
            throw new Error('Track not found.');
        }

        res.status(200).json(track);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - /tracks/:trackId update a track
router.put('/:trackId', async (req, res) => {
    try {
        // find the track
        const track = await Track.findById(req.params.trackId);
        // check if track exists
        if (!track) {
            return res.status(404).json({ error: 'Track not found!' });
        }
        // update track
        const updatedTrack = await Track.findByIdAndUpdate(
            req.params.trackId,
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedTrack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - /tracks/:trackId delete a track
router.delete('/:trackId', async (req, res) => {
    try {
        const track = await Track.findById(req.params.trackId);

        if (!track) {
            return res.status(404).json({ error: error.message });
        }
        const deletedTrack = await Track.findByIdAndDelete(req.params.trackId);
        res.status(200).json(deletedTrack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;